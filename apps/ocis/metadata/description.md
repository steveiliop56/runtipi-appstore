# ownCloud Infinite Scale

- [ownCloud Infinite Scale](#owncloud-infinite-scale)
  - [After installation](#after-installation)
  - [Introduction](#introduction)
  - [Overview](#overview)
    - [Clients](#clients)
    - [Web Office Applications](#web-office-applications)
    - [Authentication](#authentication)
    - [Installation](#installation)
  - [Important Readings](#important-readings)
  - [Run ownCloud Infinite Scale](#run-owncloud-infinite-scale)
    - [Use the Official Documentation](#use-the-official-documentation)
  - [Documentation](#documentation)
    - [Admin Documentation](#admin-documentation)
    - [Development Documentation](#development-documentation)

## After installation

After installing the app you should run:

```bash
docker exec -it ocis_steveiliop56-ocis-1 ocis init --force-overwrite --insecure yes
```

Then remove the old data:

```bash
rm -rf runtipi/app-data/steveiliop56/ocis/data/ocis
```

Recreate the data directory (use a non-root account):

```bash
mkdir -p runtipi/app-data/steveiliop56/ocis/data/ocis
```

Finally restart the app and you should be good to go.

## Introduction

ownCloud Infinite Scale (oCIS) is the new file sync & share platform that will be the foundation of your data management platform.

Make sure to download the [latest released version](https://download.owncloud.com/ocis/ocis/stable/?sort=time&order=desc) today!

## Overview

### Clients

Infinite Scale allows the following ownCloud clients:

- [web](https://github.com/owncloud/web),
- [Android](https://github.com/owncloud/android),
- [iOS](https://github.com/owncloud/ios-app) and
- [Desktop](https://github.com/owncloud/client/)

to synchronize and share file spaces with a scalable server backend based on [reva](https://reva.link/) using open and well-defined APIs like [WebDAV](http://www.webdav.org/) and [CS3](https://github.com/cs3org/cs3apis/).

### Web Office Applications

Infinite Scale can integrate web office applications such as:

- [Collabora Online](https://github.com/CollaboraOnline/online),
- [OnlyOffice Docs](https://github.com/ONLYOFFICE/DocumentServer) or
- [Microsoft Office Online Server](https://owncloud.com/microsoft-office-online-integration-with-wopi/)

Collaborative editing is supported by the [WOPI application gateway](https://github.com/cs3org/wopiserver).

### Authentication

Users are authenticated via [OpenID Connect](https://openid.net/connect/) using either an external IdP like [Keycloak](https://www.keycloak.org/) or the embedded [LibreGraph Connect](https://github.com/libregraph/lico) identity provider.

### Installation

With focus on easy install and operation, Infinite Scale is delivered as a single binary or container that allows scaling from a Raspberry Pi to a Kubernetes cluster by changing the configuration and starting multiple services as needed. The multiservice architecture allows tailoring the functionality to your needs and reusing services that may already be in place like when using Keycloak. See the details below for various installation options.

## Important Readings

Before starting to set up an instance, we **highly** recommend reading the [Prerequisites](https://doc.owncloud.com/ocis/next/prerequisites/prerequisites.html), the [Deployment](https://doc.owncloud.com/ocis/next/deployment/) section and especially the [General Information](https://doc.owncloud.com/ocis/next/deployment/general/general-info.html) page describing and explaining information that is valid for all deployment types.

## Run ownCloud Infinite Scale

### Use the Official Documentation

See the [Install Infinite Scale on a Server](https://doc.owncloud.com/ocis/next/depl-examples/ubuntu-compose/ubuntu-compose-prod.html) for a production ready deployment starting with a Raspberry Pi, a single server or VM.

## Documentation

### Admin Documentation

Refer to the [Admin Documentation - Introduction to Infinite Scale](https://doc.owncloud.com/ocis/next/) to get started with running oCIS in production.

### Development Documentation

See the [Development Documentation - Getting Started](https://owncloud.dev/ocis/development/getting-started/) to get an overview of [Requirements](https://owncloud.dev/ocis/development/getting-started/#requirements), the [repository structure](https://owncloud.dev/ocis/development/getting-started/#repository-structure) and [other starting points](https://owncloud.dev/ocis/development/getting-started/#starting-points).
