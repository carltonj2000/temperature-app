import type { Actions } from '@sveltejs/kit';
import { readFile, readdir, writeFile } from 'fs/promises';
import path from 'path';

const mainDir = '/renderws/carltonData/cj2023/code/temperature';

export async function load() {
  const dd = await readdir(mainDir);
  const regex = new RegExp('^temperature([0-9]{8}$)');
  const dirs = dd
    .filter((d) => regex.test(d))
    .map((d) => regex.exec(d)![1])
    .sort((a, b) => Number(b) - Number(a));
  return { dirs };
}

const getDatasets = async (subDir: string) => {
  const filesAll = await readdir(subDir);
  const files = filesAll.filter((f) => f.match(/.*[-_]data.csv$/));
  const datasets = await Promise.all(
    files.map(async (file) => {
      const data = await readFile(path.join(subDir, file));
      //const lines = data.toString().split('\n').slice(1, 5);
      const lines = data.toString().trim().split('\n');
      lines.shift();
      const json = lines.map((l) => {
        const tth = l.split(',');
        const time = tth[0].replaceAll('"', '');
        const temperature = Number(tth[1].replaceAll('"', ''));
        const humidity = Number(tth[2].replaceAll('"', ''));
        return { time, temperature, humidity };
      });
      return { file, json };
    })
  );
  return datasets;
};

const mergeData = (datasets: { json: any }[]) => {
  let cjIdx = 0;
  let tdIdx = 0;
  const cjJson = datasets[0].json;
  const tdJson = datasets[1].json;
  const json = [];
  do {
    const cj = cjJson[cjIdx];
    const td = tdJson[tdIdx];
    const cjTime = new Date(cj.time);
    const tdTime = new Date(td.time);
    const format = (d: Date) =>
      d.getFullYear() +
      '-' +
      d.toLocaleString('default', { month: '2-digit' }) +
      '-' +
      d.toLocaleString('default', { day: '2-digit' }) +
      ' ' +
      d.getHours() +
      ':' +
      ('0' + d.getMinutes()).slice(-2) +
      ':' +
      ('0' + d.getSeconds()).slice(-2);
    const cjTimeLocale = format(cjTime);
    const tdTimeLocale = format(tdTime);
    if (cjTime === tdTime) {
      json.push({
        time: cjTimeLocale,
        temperature: {
          cj: cj.temperature,
          td: td.temperature
        },
        humidity: { cj: cj.humidity, td: td.humidity }
      });
      cjIdx++;
      tdIdx++;
    } else if (cjTime < tdTime) {
      json.push({
        time: cjTimeLocale,
        temperature: {
          cj: cj.temperature
        },
        humidity: { cj: cj.humidity }
      });
      cjIdx++;
    } else {
      json.push({
        time: tdTimeLocale,
        temperature: {
          td: td.temperature
        },
        humidity: { td: td.humidity }
      });
      tdIdx++;
    }
  } while (cjIdx < cjJson.length && tdIdx < tdJson.length);

  return json;
};

const tableData = (json: any[]) => {
  const table = json.map((d) => {
    const t = d.temperature;
    const h = d.humidity;
    let r = ',' + (t.cj ?? '');
    r += ',' + (t.td ?? '');
    r += ',' + (h.cj ?? '');
    r += ',' + (h.td ?? '');
    return `${d.time}${r}`;
  });
  return table;
};

type TH = {
  time: string;
  temperature: {
    td?: number;
    cj?: number;
  };
  humidity: {
    td?: number;
    cj?: number;
  };
};

const interpolate = (di: TH[]) => {
  const dout: TH[] = [];
  di.forEach((d, i) => {
    if (d.temperature.cj && d.temperature.td) {
      dout.push(d);
    } else if (i < di.length - 2) {
      let j = i;
      if (d.temperature.cj) {
        do {
          j++;
        } while (di[j].temperature.td === undefined && j < di.length);
        const d2 = di[j];
        dout.push({
          time: d.time,
          temperature: { cj: d.temperature.cj, td: d2.temperature.td },
          humidity: { cj: d.humidity.cj, td: d2.humidity.td }
        });
      } else {
        do {
          j++;
        } while (di[j].temperature.cj === undefined && j < di.length);
        const d2 = di[j];
        dout.push({
          time: d.time,
          temperature: { td: d.temperature.td, cj: d2.temperature.cj },
          humidity: { td: d.humidity.td, cj: d2.humidity.cj }
        });
      }
    } else {
      if (d.temperature.cj) {
        let j = di.length - 1;
        do {
          j--;
        } while (di[j].temperature.td === undefined && j > 0);
        const d2 = di[j];
        dout.push({
          time: d.time,
          temperature: { cj: d.temperature.cj, td: d2.temperature.td },
          humidity: { cj: d.humidity.cj, td: d2.humidity.td }
        });
      } else {
        let j = i;
        do {
          j--;
        } while (di[j].temperature.cj === undefined && j > 0);
        const d2 = di[j];
        dout.push({
          time: d.time,
          temperature: { td: d.temperature.td, cj: d2.temperature.cj },
          humidity: { td: d.humidity.td, cj: d2.humidity.cj }
        });
      }
    }
  });
  return dout;
};

const c2f = (c: number) => (c * 9) / 5 + 32;

const jsonC2f = (jsoni: TH[]) => {
  const jsonif = jsoni.map((d) => {
    const { temperature: t } = d;
    if (t.cj && t.td)
      return { ...d, temperature: { cj: c2f(t.cj), td: c2f(t.td) } };
    if (t.cj) return { ...d, temperature: { cj: c2f(t.cj) } };
    if (t.td) return { ...d, temperature: { td: c2f(t.td) } };
  });
  return jsonif;
};

export const actions: Actions = {
  default: async ({ request }) => {
    const fd = await request.formData();
    const d = fd.get('dir');
    const subDir = path.join(mainDir, 'temperature' + d);

    const datasets = await getDatasets(subDir);
    const json = mergeData(datasets);
    const jsoni = interpolate(json);
    const jsonif = jsonC2f(jsoni);
    const table = tableData(jsonif);
    await writeFile(path.join(subDir, 'merged.csv'), table.join('\n'), 'utf-8');
    return { success: true, datasets, json, jsoni, jsonif, table };
  }
};
