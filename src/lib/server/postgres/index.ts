import { getDB } from './util';
import { temperature } from './sql';

//import postgres from 'postgres';

import { PG_USER, PG_PASSWORD } from '$env/static/private';
const connectStr = `postgres://${PG_USER}:${PG_PASSWORD}@localhost:5432/temperature`;

//const sql = postgres(connectStr);
//export default sql;

// const db = pgp()(connectStr); // replaced b/c of dev warning with 2 line below
const { db } = getDB(connectStr);

export const selectAll = async () => {
  const dateNow = Date.now();
  const dateNew = new Date();
  console.log({ dateNow, dateNew });
  return await db.any(temperature.selectAll);
};

export const insert1 = async () => {
  await db.none(temperature.insert1, [new Date(Date.now()), 'cj', 23.1, 79]);
};
