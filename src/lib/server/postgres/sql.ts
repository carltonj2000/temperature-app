import { QueryFile } from 'pg-promise';
import path, { join as joinPath } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sql(file: string) {
  const fullPath = joinPath(__dirname, file);
  return new QueryFile(fullPath, { minify: true, noWarnings: true });
}

export const temperature = {
  insert1: sql('sql/temperature/insert1.sql'),
  selectAll: sql('sql/temperature/selectAll.sql'),
  maxDate: sql('sql/temperature/maxDate.sql'),
  minDate: sql('sql/temperature/minDate.sql'),
  selectDateRange: sql('sql/temperature/selectDateRange.sql')
};
