import { readFile } from 'fs/promises';
import path from 'path';

export const mainDir = '/renderws/carltonData/cj2023/code/temperature';

export type tthx2Type = {
  time: string;
  temperature: {
    cj: number;
    td: number;
  };
  humidity: {
    cj: number;
    td: number;
  };
};
export type tthType = { time: string; temperature: number; humidity: number };
export type fileTthType = { file: string; json: tthType[] };

export const getFile = async (
  subDir: string,
  file: string
): Promise<fileTthType> => {
  const data = await readFile(path.join(subDir, file));
  //const lines = data.toString().trim().split('\n').slice(1, 10);
  const lines = data.toString().trim().split('\n');
  lines.shift(); // get rid of header line
  const json = lines.map((l) => {
    const tth = l.split(',');
    const time = tth[0].replaceAll('"', '');
    const temperature = Number(tth[1].replaceAll('"', ''));
    const humidity = Number(tth[2].replaceAll('"', ''));
    return { time, temperature, humidity };
  });
  return { file, json };
};

export const getTth = async (file: string): Promise<tthx2Type[]> => {
  const data = (await readFile(file)).toString();
  const tth: tthx2Type[] = JSON.parse(data);
  return tth;
};
