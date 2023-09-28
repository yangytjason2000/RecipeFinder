#!/bin/bash
docker-compose down -v
docker image prune -a -f
docker-compose up --build
