// From
// https://stackoverflow.com/questions/34382796/where-should-i-initialize-pg-promise

// cj saw error below during dev probalbly due to hmr
//
// WARNING: Creating a duplicate database object for the same connection.

// generic singleton creator:
export function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name);
  let scope = (global as any)[s];
  if (!scope) {
    scope = { ...create() };
    (global as any)[s] = scope;
  }
  return scope;
}

import pgLib from 'pg-promise';

const pgp = pgLib();

interface IDatabaseScope {
  db: pgLib.IDatabase<any>;
  pgp: pgLib.IMain;
}

export function getDB(connectStr: string): IDatabaseScope {
  return createSingleton<IDatabaseScope>('my-app-db-space', () => {
    return {
      db: pgp(connectStr),
      pgp
    };
  });
}
