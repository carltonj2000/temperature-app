import type { Actions } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import { mainDir, getFile } from './utils';
import { selectAll, insert1, insertbulk1 } from '$lib/server/postgres';
import path from 'path';

export async function load() {
  const dd = await readdir(mainDir);
  const regex = new RegExp('^temperature([0-9]{8}$)');
  const dirs = dd
    .filter((d) => regex.test(d))
    .map((d) => regex.exec(d)![1])
    .sort((a, b) => Number(b) - Number(a));
  return { dirs };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const actions: Actions = {
  insert1: async () => {
    try {
      const result = await insert1(new Date(Date.now()));
      return { success: true, result };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  },
  selectall: async () => {
    try {
      const result = await selectAll();
      return { success: true, result };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  },
  insertnselect: async () => {
    try {
      const date = new Map();
      const dnow = Date.now();
      const dnewnow = new Date(dnow);
      await sleep(500);
      const dnew = new Date();

      date.set('now', Date.now());
      date.set('newnow', dnewnow);
      date.set('new', dnew);
      await insert1(dnewnow);
      await insert1(dnew);
      const result = await selectAll();
      const result2 = result.map((r) => ({ ...r, date: r.date.toString() }));
      return { success: true, result, result2, date: Object.fromEntries(date) };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  },
  insertbulk1: async () => {
    try {
      const fileDir = path.join(mainDir, 'temperature20230212');
      const { json } = await getFile(fileDir, 'Cj-data.csv');
      const jd = json.map((j) => ({ ...j, time: new Date(j.time) }));
      const result = await insertbulk1(jd, 'cj');
      return {
        success: true,
        json: json.slice(0, 10),
        result,
        jd: jd.slice(0, 10)
      };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
};
