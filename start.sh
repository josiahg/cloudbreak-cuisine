#!/bin/bash

# Ensure we cleanly exited last time
docker-compose -f dev-docker-compose.yml down
docker-compose -f test-docker-compose.yml down

# Install NPM components
npm i backend --prefix ./backend/
npm i frontend --prefix ./frontend/

# Spin up the containers
docker-compose -f test-docker-compose.yml up