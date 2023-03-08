import type { Actions } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import { mainDir } from '../utils';
import { merge } from './merge';

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
  }
};
