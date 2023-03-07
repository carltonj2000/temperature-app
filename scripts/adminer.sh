#!/bin/bash

docker run -d --link local-postgres -p 8080:8080 adminer:4.8.1-standalone

