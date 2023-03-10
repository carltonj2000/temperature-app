#!/bin/bash

docker run --name adminer \
  -d --link local-postgres -p 8080:8080 adminer:4.8.1-standalone

