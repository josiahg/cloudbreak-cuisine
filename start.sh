#!/bin/bash

# Ensure we cleanly exited last time
docker-compose -f dev-docker-compose.yml down
docker-compose -f test-docker-compose.yml down

# Ensure containers are up to date
docker pull chaffelson/whoville:latest
docker pull josiahgoodson/cloudbreak-cuisine-frontend:latest
docker pull josiahgoodson/cloudbreak-cuisine-backend:latest

if [ "$1" != "skipInit" ]
then
    # Install NPM components
    npm i backend --prefix ./backend/
    npm i frontend --prefix ./frontend/
 
    # Fix missing Linux package
    docker run -d --name cuisine_frontend -v ${PWD}/frontend:/usr/src/app -t josiahgoodson/cloudbreak-cuisine-frontend:latest
    docker exec cuisine_frontend npm rebuild node-sass
    docker stop cuisine_frontend
    docker rm cuisine_frontend
fi

# Spin up the containers
docker-compose -f test-docker-compose.yml up