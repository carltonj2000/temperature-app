#!/bin/bash
local=/renderws/carltonData/cj2023/code/temperature/temperature-app/db_data/postgres
docker run -d \
  -p 5432:5432 \
	--name local-postgres \
	-e POSTGRES_PASSWORD=mysecretpassword \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v $local:/var/lib/postgresql/data \
	postgres:15.2-bullseye
