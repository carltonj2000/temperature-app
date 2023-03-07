CREATE TABLE "temperature" (
  "date" timestamptz NOT NULL,
  "name" text NOT NULL,
  "celsius" real NOT NULL,
  "humidity" real NOT NULL,
  CONSTRAINT date_name_pk PRIMARY KEY ("date",  "name")
);
