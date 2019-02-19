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

### Pre-requisites

* Docker

Important: For whoville, follow the setup instructions [here](https://github.com/Chaffelson/whoville).

You must have an SSHKEY environment variable containing the path to your private key `key_name.pem`.

You must have a PROFILE environment variable containing the path to your whoville `profile.yml`.

In addition, for Cuisine add the following option in `profile.yml`:

```
user_mode: UI
```

### Clone this repository

```
git clone https://github.com/josiahg/cloudbreak-cuisine
```

### Start Cuisine

The following will download all dependencies using NPM, and start the various components:

```
cd cloudbreak-cuisine/
./start.sh
```

Go have a cup of coffee!

When startup completes, point a browser to [http://localhost:3000/](http://localhost:3000/).

The Swagger API  UI for the Cuisine Backend can be found at [http://localhost:4000/api-docs](http://localhost:4000/api-docs).



## Troubleshooting

Something didn't work? 

Restart the application. Restarting ensures the latest version is running.

```
./start.sh
```

Questions? Cloudera employees can join us in `#proj_whoville` on Slack.


# Basic usage


# Authors

**Josiah Goodson** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/josiahgoodson/)

**Paul Vidal** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/paulvid/)

# Thanks

**Jeff Kibler** - *Beta Tester*