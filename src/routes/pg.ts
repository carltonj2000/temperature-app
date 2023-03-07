import sql from '$lib/server/postgres';

export const insert() {
  await sql`insert into temperature 
(date, name, celsius, humidity) values
('2023-02-14 18:00:36', 'td', 22.1, 78.4)`;

}

export const createTable() {
  await sql`
CREATE TABLE "temperature" (
  "date" timestamp NOT NULL,
  "name" text NOT NULL,
  "celsius" real NOT NULL,
  "humidity" real NOT NULL,
  CONSTRAINT date_name_pk PRIMARY KEY ("date",  "name")
)`

}
