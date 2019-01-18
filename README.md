# Cloudbreak Cuisine - v0.1
<div align="center">
<img src="https://github.com/paulvid/cloudbreak-cuisine-frontend/raw/master/src/assets/img/brand/small_logo.png" width="500" height="500" align="middle">
</div>

# Overview

Cloudbreak Cuisine is a React application allowing easier use of Hortonworks Cloudbreak/Whoville, by offering the following functionalities:
* Choose from a Library Of Pre-Built Blueprints & Recipes combinations (a.k.a. Bundles)
* Generate your own Bundles
* Deploy your Bundles

# Installation

This project is under rapid development. Stay tuned for an "easy button" to get this up and running.

Until then...

### Pre-requisites

* Docker
* npm (can be installed via homebrew)

Important: For whoville, follow the setup instructions [here](https://github.com/Chaffelson/whoville).

You must have a PROFILE environment variable containing the path to your whoville `profile.yml`.

In addition, for Cuisine add the following option in `profile.yml`:

```
user_mode: UI
```

### Clone this repository

```
git clone https://github.com/josiahg/cloudbreak-cuisine
```

### Start the backend

The following will start the backend database and API server.

```
cd cloudbreak-cuisine/backend
npm install
```

```
cd .. # back to cloudbreak-cuisine directory
docker-compose -f dev-docker-compose.yml up
```

When startup is complete, find the Swagger API UI at [http://localhost:4000/api-docs](http://localhost:4000/api-docs).


### Start the frontend

In a new terminal:

```
cd cloudbreak-cuisine/frontend
npm install
npm start
```

When startup completes, the default browser will open to the UI. Or, visit [http://localhost:3000/](http://localhost:3000/).


## Troubleshooting

Something didn't work? 

Ensure you are on the latest version of whoville, we are using their latest and greatest APIs:

```
docker pull chaffelson/whoville:latest
```

To restart the backend, ensure you use the following to ensure all components are cleaned up before starting again:

```
docker-compose -f dev-docker-compose.yml down
```

Questions? Cloudera employees can join us in `#proj_whoville` on Slack.


# Basic usage


# Authors

**Josiah Goodson** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/josiahgoodson/)

**Paul Vidal** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/paulvid/)

# Thanks

**Jeff Kibler** - *Beta Tester*