import type { Actions } from '@sveltejs/kit';
import { mainDir, getFile } from './utils';
import {
  selectAll,
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
      const fileDir = path.join(mainDir, 'temperature20230308');
      const { json } = await getFile(fileDir, 'Cj_data.csv');
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
