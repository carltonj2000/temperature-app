import type { Actions } from '@sveltejs/kit';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

const mainDir = '/renderws/carltonData/cj2023/code/temperature';

export async function load() {
  const dd = await readdir(mainDir);
  const regex = new RegExp('^temperature([0-9]{8}$)');
  const dirs = dd
    .filter((d) => regex.test(d))
    .map((d) => regex.exec(d)![1])
    .sort((a, b) => Number(a) - Number(b));
  return { dirs };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const fd = await request.formData();
    const d = fd.get('dir');
    const subDir = path.join(mainDir, 'temperature' + d);
    const files = await readdir(subDir);
    const datasets = await Promise.all(
      files.map(async (file) => {
        const data = await readFile(path.join(subDir, file));
        const lines = data.toString().split('\n').slice(1, 5);
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
    return { success: true, datasets };
  }
};
