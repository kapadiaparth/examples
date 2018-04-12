# Bulk Load CSV Files into Elasticsearch

This demo uses the [Flex.io Javascript SDK](https://www.flex.io/docs/javascript-sdk/) to copy CSV files cloud storage providers into Elasticsearch. In addition it provides permutations to load from an API, like Twilio or a database, like Postgres.  Further, it shows how to add a Python script (using pandas) to perform some preprocessing prior to the Elasticsearch upload.

## Overview

[Flex.io](http://Flex.io) is an API for moving, processing and integrating data in the cloud that helps developers build and deploy scalable data feeds with just a few lines of code.

This repo provides the source data and pipes used in the [Bulk Load CSV Files into Elasticsearch Indices](https://www.flex.io/docs/tutorials/copy-transfer-files-cloud-storage-s3-dropbox) tutorial.


## Installation

### Node.js

The preferred way of installing the Flex.io SDK for Node.js is to use [NPM](https://www.npmjs.com/), the Node.js package manager. Simply go to your project's directory and enter the following command at the command prompt:

```
npm install flexio-sdk-js
```

## Setup

You will need an API key in order to use the Flex.io Javascript SDK. You can sign up for a [Free Flex.io API Key here](https://www.flex.io/app/signup).

```javascript
Flexio.setup('YOUR_API_KEY')
```

## Code

The pipes code used in the tutorials can be found in this repo as follows:

* [pipe.js](./pipe.js) - Read single CSV file from cloud storage, convert, write to Elasticsearch
* [pipe-multiple.js](./pipe-multiple.js) - Read multiple CSV files from cloud storage, convert, write to Elasticsearch
* [pipe-postgres.js](./pipe-postgres.js) - Read from a database table, like Postgres, write to Elasticsearch
* [pipe-twilio.js](./pipe-twilio.js) - Read from Twilio (call logs), convert, write to Elasticsearch
* [pipe-python.js](./pipe-python.js) - Read from Twilio (call logs), convert, Python (pandas) process to lowercase, write to Elasticsearch

For example, here are the core tasks from the [pipe.js](./pipe.js) snippet:

```javascript
Flexio.pipe()
  .read('/tutorial-dropbox/es/contacts.csv')
  .convert('csv','table')
  .write('/tutorial-elasticsearch/contacts.csv')
```

All Flex.io pipes start with `Flexio.pipe()`. Tasks in a pipe are chained together using periods similar to how jQuery and other APIs chain calls together.  The `read` and `write` tasks use an alias of your connection.  [Here is a guide on setting up a connection in Flex.io](https://www.flex.io/docs).


### Running the pipe in your Javascript code

Flex.io pipes can be run in your Javascript code inline without needing to be saved externally.

```javascript
  .run()
```

### Saving the pipe for later use

Once you have prototyped your pipe, you may save it for later use. Saving a pipe is very useful as it will allow it to be called via the REST API or a cURL call with the specified pipe alias.

**NOTE: The alias `examples-transfer-csv-to-elasticsearch` below needs to be replaced with your own in order to save this pipe to your account. Best practices for aliases are to use your username as a prefix (e.g. `transfer-csv-to-elasticsearch`).**

```javascript
  .save({
    name: 'CSV to Elasticsearch',
    alias: 'examples-transfer-csv-to-elasticsearch'
  })
```

## Deploying the pipe

This is how you can run the saved pipe via an HTTP or cURL request:

##### HTTP

```javascript
$.ajax({
  type: 'POST',
  url: 'https://api.flex.io/v1/me/pipes/transfer-csv-to-elasticsearch/run?flexio_api_key=YOUR_API_KEY',
  data: {
    url: 'https://www.flex.io'
  },
  dataType: 'json'
})
```

##### cURL

```
curl -X POST 'https://api.flex.io/v1/me/pipes/transfer-csv-to-elasticsearch/run' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d "url=https://www.flex.io" \
```

To use the pipe you've saved with this example, insert your own pipe alias and API key.

```
  url: 'https://api.flex.io/v1/me/pipes/transfer-csv-to-elasticsearch/run?flexio_api_key=YOUR_API_KEY',
```

## Get Help

If you have question or would like more information, please feel free to email the [Flex.io developer support team](support@flex.io) or the chat button at the bottom of the [Flex.io website](https://www.flex.io).
