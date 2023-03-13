import type { Actions } from '@sveltejs/kit';
import { mainDir, getFile, type tthType } from './utils';
import {
  selectAll,
  clearTable,
  insert1,
  insertbulk1,
  maxDate,
  minDate,
  selectDateRange
} from '$lib/server/postgres';
import path from 'path';

export async function load() {
  const start = new Date(2023, 1, 14, 18, 0).toISOString();
  const end = new Date(2023, 1, 14, 19, 0).toISOString();
  const cj = await selectDateRange(start, end, 'cj');
  const tdr = await selectDateRange(start, end, 'tdr');
  return {
    minDate: await minDate(),
    maxDate: await maxDate(),
    tnh: { cj, tdr }
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const actions: Actions = {
  clearTable: async () => {
    try {
      const result = await clearTable();
      return { success: true, result };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  },
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
      const { json, result, jd } = await insertBulk1(
        'temperature20230308',
        'Cj_data.csv',
        'cj'
      );
      const {
        json: json2,
        result: result2,
        jd: jd2
      } = await insertBulk1('temperature20230308', 'Tdr_data.csv', 'tdr');
      return {
        success: true,
        result,
        result2,
        json: [...json.slice(0, 2), ...json2.slice(0, 2)],
        jd: [...jd.slice(0, 2), ...jd2.slice(0, 2)]
      };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
};

const insertBulk1 = async (subDir: string, file: string, name: string) => {
  const fileDir = path.join(mainDir, subDir);
  const { json } = await getFile(fileDir, file);
  const jd: tthType[] = json.map((j) => ({ ...j, date: new Date(j.date) }));
  const result = await insertbulk1(jd, name);
  return { json, result, jd };
};
