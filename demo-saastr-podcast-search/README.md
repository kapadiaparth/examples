# Saastr Podcast Search

This demo uses the [Flex.io Javascript SDK](https://www.flex.io/docs/javascript-sdk/) to request a CSV from GitHub, convert it to a table, select a subset of columns, filter it based on a search string from an HTML input and output the result in JSON.

## Overview

[Flex.io](http://Flex.io) is an API for moving, processing and integrating data in the cloud that helps developers build and deploy scalable data feeds with just a few lines of code.

## Demo

https://flexiodata.github.io/examples/demo-saastr-podcast-search/

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

All of the code that we'll build up in this example can be found in the [pipe.js](./pipe.js) file in this repository.

All Flex.io pipes start with `Flexio.pipe()`. Tasks in a pipe are chained together using periods similar to how jQuery and other APIs chain calls together.

```javascript
Flexio.pipe()
```

### Request

The `request` task allows you to request the contents of a specific URL. Doing the following will issue a web request to get the contents of the `saastr-podcast-20170205` file on GitHub.

```javascript
  .request('https://raw.githubusercontent.com/flexiodata/examples/master/demo-saastr-podcast-search/source-data/saastr-podcast-20170205.csv')
```

### Convert

The `convert` task allows you to convert the input from one format to another. In this particular step, we'll convert the CSV file from the previous step into a tabular format.

```javascript
  .convert('csv', 'table')
```

### Select

The `select` task allows us to choose certain columns from the input table and only output those columns to the next step.

```javascript
  .select("url","title","description","date","guest","position","company","category","biggest challenge","saas resources","notes")
```

### Filter

The `filter` task allows us to output a reduced set of data from the input by applying a `where` condition. The value we'll filter on is `${form.filter}` which comes from the `filter` POST parameter.

```javascript
  .filter("contains(lower(concat(title,description,notes,[saas resources])),lower('${form.filter}'))")
```

### Convert

Finally, we'll use the `convert` task again to convert the output back to JSON.

```javascript
  .convert('table', 'json')
```

### Running the pipe in your Javascript code

Flex.io pipes can be run in your Javascript code right away without needing to be saved externally.

```javascript
  .run()
```

### Saving the pipe for later use

Once your pipe is doing exactly what you'd like, you may save it for later use. Saving a pipe is very useful as it will allow it to be called via the REST API or a cURL call with the specified pipe alias. We recommend adding your Flex.io username as a prefix to all of your aliases.

**NOTE: The alias `examples-demo-saastr-podcast-search` below needs to be replaced with your own in order to save this pipe to your account. Best practices for aliases are to use your username as a prefix (e.g. `demo-saastr-podcast-search`).**

```javascript
  .save({
    name: 'Saastr Podcast Search',
    alias: 'examples-demo-saastr-podcast-search'
  })
```

## Deploying the pipe

This is how you can run the saved pipe via an HTTP or cURL request:

##### HTTP

```javascript
$.ajax({
  type: 'POST',
  url: 'https://api.flex.io/v1/me/pipes/demo-saastr-podcast-search/run?flexio_api_key=YOUR_API_KEY',
  data: {
    filter: 'ipo'
  },
  dataType: 'json'
})
```

##### cURL

```
curl -X POST 'https://api.flex.io/v1/me/pipes/demo-saastr-podcast-search/run' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d "filter=ipo"
```

To use the pipe you've saved with this example, edit [line 148 of the index.html](./index.html#L148) file and insert your pipe alias and API key.

```
  url: 'https://api.flex.io/v1/me/pipes/demo-saastr-podcast-search/run?flexio_api_key=YOUR_API_KEY',
```

## Get Help

If you have question or would like more information, please feel free to email the [Flex.io developer support team](support@flex.io) or the chat button at the bottom of the [Flex.io website](https://www.flex.io).
