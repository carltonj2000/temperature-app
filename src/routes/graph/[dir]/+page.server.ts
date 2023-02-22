import { error } from '@sveltejs/kit';
import { stat } from 'fs/promises';
import path from 'path';
import { mainDir, getTth } from '../../utils';
import type { tthx2Type } from '../../utils';

type paramTypes = {
  dir: string;
};

export type dateFileTthType = {
  mainDir: string;
  dir: string;
  tth: tthx2Type[];
};

export async function load({
  params
}: {
  params: paramTypes;
}): Promise<dateFileTthType> {
  const { dir } = params;
  if (!dir) throw error(404, 'dir param not found');
  const file = path.join(mainDir, 'temperature' + dir, 'merged.json');
  const fileExists = !!(await stat(file).catch(() => false));
  if (!fileExists) throw error(404, `did not find ${file}`);
  const tth = await getTth(file);
  return { ...params, mainDir, tth };
}
