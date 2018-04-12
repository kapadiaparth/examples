# Copy Files Between Cloud Storage

This demo uses the [Flex.io Javascript SDK](https://www.flex.io/docs/javascript-sdk/) to copy files between cloud storage providers such as AWS S3 and Dropbox. In addition it provides permutations to filter the file transfer based on file name, file size and modified date.

## Overview

[Flex.io](http://Flex.io) is an API for moving, processing and integrating data in the cloud that helps developers build and deploy scalable data feeds with just a few lines of code.

This repo provides the source data and pipes used in the [Copy and Transfer Files between Cloud Storage](https://www.flex.io/docs/tutorials/bulk-load-csv-files-elasticsearch-indices) tutorial.


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

* [pipe.js](./pipe.js) - Read a single file from AWS S3 and write to Dropbox
* [pipe-multiple.js](.pipe-multiple.js) - Read a directory from AWS S3 and copy to Dropbox
* [pipe-filetype-filter.js](.pipe-filetype-filter.js) - Read a directory from AWS S3, filter based on file extension and copy to Dropbox
* [pipe-filename-filter.js](.pipe-filename-filter.js) - Read a directory from AWS S3, filter based on filename wildcard and extension and copy to Dropbox
* [pipe-filename-filetype-filter.js](.pipe-filename-filetype-filter.js) - Read a directory from AWS S3, filter based on filename only and copy to Dropbox
* [pipe-filesize-filter.js](.pipe-filesize-filter.js) - Read a directory from AWS S3, filter based on file size and copy to Dropbox
* [pipe-filedate-filter.js](.pipe-filedate-filter.js) - Read a directory from AWS S3, filter based on file modified date and copy to Dropbox

For example, here are the core tasks from the [pipe-multiple.js](./pipe.js) snippet:

```javascript
Flexio.pipe()
  .list('/tutorial-s3')
  .foreach(
    Flexio.pipe()
      .read('/tutorial-s3/${item.name}')
      .write('/tutorial-dropbox/backup-${process.time.unix}/${item.name}')
```

All Flex.io pipes start with `Flexio.pipe()`. Tasks in a pipe are chained together using periods similar to how jQuery and other APIs chain calls together.  The `list` task accesses the directory, the `foreach` task is a loop to `read` each file from the list and `write` out to your output connection (`read` and `write` both use aliases of the connection you set up in the Flex.io app).  [Here is a guide on setting up a connection in Flex.io](https://www.flex.io/docs).


### Running the pipe in your Javascript code

Flex.io pipes can be run in your Javascript code inline without needing to be saved externally.

```javascript
  .run()
```

### Saving the pipe for later use

You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our REST API or cURL. **Note that the alias `examples-transfer-copy-files-between-cloud-storage` below needs to be replaced with your own alias in order to save this pipe to your account (e.g. `transfer-copy-files-between-cloud-storage`)**


```javascript
  .save({
    name: 'S3 to Dropbox',
    alias: 'examples-transfer-copy-files-between-cloud-storage'
  })
```

## Deploying the pipe

This is how you can run the saved pipe via an HTTP or cURL request:

##### HTTP

```javascript
$.ajax({
  type: 'POST',
  url: 'https://api.flex.io/v1/me/pipes/transfer-copy-files-between-cloud-storage/run?flexio_api_key=YOUR_API_KEY',
  data: {
    url: 'https://www.flex.io'
  },
  dataType: 'json'
})
```

##### cURL

```
curl -X POST 'https://api.flex.io/v1/me/pipes/transfer-copy-files-between-cloud-storage/run' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d "url=https://www.flex.io" \
```

To use the pipe you've saved with this example, insert your own pipe alias and API key.

```
  url: 'https://api.flex.io/v1/me/pipes/transfer-copy-files-between-cloud-storage/run?flexio_api_key=YOUR_API_KEY',
```

## Get Help

If you have question or would like more information, please feel free to email the [Flex.io developer support team](support@flex.io) or the chat button at the bottom of the [Flex.io website](https://www.flex.io).
