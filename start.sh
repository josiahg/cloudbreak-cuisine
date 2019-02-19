#!/bin/bash

# Ensure that $PROFILE has been set
if [ -z $PROFILE ]
then
    echo "ERROR: Please set PROFILE environment variable."
    echo "NOTE: PROFILE should point to Whoville profile.yml"
    echo ""
    echo "EXITING"
    exit 1;
fi

# Ensure that $SSHKEY has been set
if [ -z $SSHKEY ]
then
    echo "ERROR: Please set SSHKEY environment variable."
    echo "NOTE: SSHKEY should point to the .pem file you intend to use with your cluster"
    echo ""
    echo "EXITING"
    exit 1;
fi

# Ensure we cleanly exited last time
docker-compose -f docker/dev-docker-compose.yml down
docker-compose -f docker/test-docker-compose.yml down
docker-compose -f docker/prod-docker-compose.yml down

# Ensure containers are up to date
docker pull chaffelson/whoville:latest
docker pull josiahgoodson/cloudbreak-cuisine-frontend:latest
docker pull josiahgoodson/cloudbreak-cuisine-backend:latest

# Spin up the containers
docker-compose -f docker/prod-docker-compose.yml up