import type { Actions } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import { mainDir } from './utils';
import { merge } from './merge';
import { selectAll, insert1 } from '$lib/server/postgres';

export async function load() {
  const dd = await readdir(mainDir);
  const regex = new RegExp('^temperature([0-9]{8}$)');
  const dirs = dd
    .filter((d) => regex.test(d))
    .map((d) => regex.exec(d)![1])
    .sort((a, b) => Number(b) - Number(a));
  return { dirs };
}

export const actions: Actions = {
  merge: async ({ request }) => {
    const fd = await request.formData();
    const d = fd.get('dir')?.toString()!;
    return await merge(d);
  },
  insert1: async () => {
    try {
      const result = await insert1();
      console.log({ result });
    } catch (error) {
      console.error({ error });
      return { success: false };
    }
  },
  selectall: async () => {
    try {
      const result = await selectAll();
      console.log({ result });
    } catch (error) {
      console.error({ error });
      return { success: false };
    }
  }
};
