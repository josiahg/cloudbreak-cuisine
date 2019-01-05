# Cloudbreak Cuisine - v0.01
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


# Basic usage


# Authors

**Paul Vidal** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/paulvid/)

**Josiah Goodson** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/josiahgoodson/)

