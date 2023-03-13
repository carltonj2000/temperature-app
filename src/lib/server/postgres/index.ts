import { getDB } from './util';
import { temperature } from './sql';
import type { tthType } from '../../../routes/utils';

import { PG_USER, PG_PASSWORD } from '$env/static/private';
const connectStr = `postgres://${PG_USER}:${PG_PASSWORD}@localhost:5432/temperature`;

// const db = pgp()(connectStr); // replaced by line below of dev warning
const { db, pgp } = getDB(connectStr);

export const maxDate = async () => {
  const r: { max_date: string }[] = await db.any(temperature.maxDate);
  return r[0].max_date;
};

export const minDate = async () => {
  const r: { min_date: string }[] = await db.any(temperature.minDate);
  return r[0].min_date;
};

export const selectAll = async () => {
  return await db.any(temperature.selectAll);
};

export const insert1 = async (date: Date) => {
  await db.none(temperature.insert1, [date, 'cj', 23.1, 79]);
};

export const clearTable = async () => {
  await db.none(temperature.clearTable);
};

export const insertbulk1 = async (json: tthType[], name: string) => {
  const cs = new pgp.helpers.ColumnSet(
    ['date', { name: 'name', def: name }, 'celsius', 'humidity'],
    { table: 'temperature' }
  );
  const insert = pgp.helpers.insert(json, cs);

  await db.none(insert);
};

export const selectDateRange = async (
  fromD: string,
  toD: string,
  name: string
) => {
  return await db.any(temperature.selectDateRange, [fromD, toD, name]);
};
