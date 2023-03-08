import { getDB } from './util';
import { temperature } from './sql';
import type { tthType } from '../../../routes/utils';

//import postgres from 'postgres';

import { PG_USER, PG_PASSWORD } from '$env/static/private';
const connectStr = `postgres://${PG_USER}:${PG_PASSWORD}@localhost:5432/temperature`;

//const sql = postgres(connectStr);
//export default sql;

// const db = pgp()(connectStr); // replaced b/c of dev warning with 2 line below
const { db, pgp } = getDB(connectStr);

export const selectAll = async () => {
  return await db.any(temperature.selectAll);
};

export const insert1 = async (date: Date) => {
  await db.none(temperature.insert1, [date, 'cj', 23.1, 79]);
};

export const insertbulk1 = async (json: tthType[], name: string) => {
  const cs = new pgp.helpers.ColumnSet(
    [
      { name: 'date', prop: 'time' },
      { name: 'name', def: name },
      { name: 'celsius', prop: 'temperature' },
      'humidity'
    ],
    { table: 'temperature' }
  );
  const insert = pgp.helpers.insert(json, cs);

  await db.none(insert);
};
