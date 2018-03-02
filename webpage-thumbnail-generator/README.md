# Webpage Text Bubble Chart

This demo uses the Flex.io Javascript SDK to load the HTML contents of the webpage and output it as a PNG image.

## Overview

Flex.io is the API for data feeds. In this demo, we'll take you through the steps necessary to create a serverless data feed which loads a webpage and outputs it as a PNG image.

## Demo

https://flexiodata.github.io/examples/webpage-thumbnail-generator/

## Installation

### Node.js

The preferred way of installing the Flex.io SDK for Node.js is to use [NPM](https://www.npmjs.com/), the Node.js package manager. Simply go to your project's directory and enter the following command at the command prompt:

```
npm install flexio-sdk-js
```

## Setup

You will need an API key in order to use the Flex.io Javascript SDK. You can generate an API key by logging into your account on Flex.io.

```javascript
Flexio.setup('YOUR_API_KEY')
```

## Code

All of the code that we'll build up in this example can be found in the [pipe.js](./pipe.js) in this repository.

All Flex.io pipes start with `Flexio.pipe()`. Tasks in a pipe are chained together using periods similar to how jQuery and other APIs chain calls together.

```javascript
Flexio.pipe()
```

### Render

The `render` task allows you to request the contents of a specific URL and render that URL as an image or a PDF. Doing the following will issue a web request to get the contents of the Flex.io homepage.

```javascript
  .render('https://www.flex.io')
```

This isn't necessarily ideal, though, as we will want to run this pipe against any valid webpage URL. To do this, we'll use a POST variable in the `render` task:

```javascript
  .render('${form.url}')
```

We can optionally also include sizing and format options to modify how the webpage is rendered:

```javascript
  .render({
    url: '${form.url}',
    format: 'png', // 'png' or 'pdf'
    width: 400,
    height: 300,
    scrollbars: false
  })
```

### Running the pipe in your Javascript code

Flex.io pipes can be run in your Javascript code right away without needing to be saved externally.

```javascript
  .run()
```

### Saving the pipe for later use

Once your pipe is doing exactly what you'd like, you may save it for later use. Saving a pipe is very useful as it will allow it to be called via the REST API or a cURL call with the specified pipe alias. We recommend adding your Flex.io username as a prefix to all of your aliases.

**NOTE: The alias `flexio-webpage-thumbnail-generator-v1` below needs to be replaced with your own in order to save this pipe to your account. Best practices for aliases are to use your username as a prefix (e.g. `YOUR_USERNAME-webpage-thumbnail-generator-v1`).**

```javascript
  .save({
    name: 'Webpage Thumbnail Generator',
    ename: 'flexio-webpage-thumbnail-generator-v1'
  })
```

This is how you can run the saved pipe via an HTTP or cURL request:

```javascript
$.ajax({
  type: 'POST',
  url: 'https://www.flex.io/api/v1/pipes/YOUR_USERNAME-webpage-thumbnail-generator-v1/run?flexio_api_key=YOUR_API_KEY',
  data: {
    url: 'https://www.flex.io'
  },
  dataType: 'json'
})
```

```
curl -X POST 'https://www.flex.io/api/v1/pipes/YOUR_USERNAME-webpage-thumbnail-generator-v1/run' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d "url=https://www.flex.io" \
```

To use the pipe you've saved with this example, edit line 67 of the [index.html](./index.html#L67) file and insert your pipe alias and API key.

```
  url: 'https://www.flex.io/api/v1/pipes/YOUR_USERNAME-webpage-thumbnail-generator-v1/run?flexio_api_key=YOUR_API_KEY',
```

## Conclusion

We hope you've enjoyed stepping through this demo and have found it useful. If you have question or would like more information, please feel free to email the [Flex.io developer support team](support@flex.io).
