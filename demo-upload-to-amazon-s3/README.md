# Upload to Amazon S3

This demo uses the [Flex.io Javascript SDK](https://www.flex.io/docs/javascript-sdk/) to upload data from an HTML form to an Amazon S3 bucket using Flex.io. The credentials for the S3 bucket are stored securely on Flex.io, while the logic for the upload is stored in the client code for maximum flexibility.

## Overview

[Flex.io](http://Flex.io) is an API for moving, processing and integrating data in the cloud that helps developers build and deploy scalable data feeds with just a few lines of code.

## Demo

https://flexiodata.github.io/examples/demo-upload-to-amazon-s3/

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

### Set

The `set` task allows you to store some data as a variable for future use in the pipe. In this particular case, we'll be assiging the variable name `filename` to the file we're uploading.

```javascript
  .set('filename', '${files.myfile.name}')
```

### Read

The `read` tasjs allows us to read the file from the HTML upload form into the pipe.

```javascript
  .read("context://files/myfile")
```

### Write

The `write` task allows us to write the file to the Flex.io Amazon S3 connection.

```javascript
  .write("/flexio-public-s3/${filename}")
```

### Echo

The `echo` task allows you to output the URL of the file on Amazon S3 using the `filename` variable from above.


```javascript
  .echo('https://s3.amazonaws.com/flexio-public-s3/${filename}')
```

### Running the pipe in your Javascript code

Flex.io pipes can be run in your Javascript code right away without needing to be saved externally.

```javascript
  .run({ data: formdata }, function(err, response) {
    document.getElementById('info').innerHTML = '' +
      '<strong>Your download link is:</strong><br><a href="' + response.text + '">' + response.text + '</a>'
      })
```

### Saving the pipe for later use

Once your pipe is doing exactly what you'd like, you may save it for later use. Saving a pipe is very useful as it will allow it to be called via the REST API or a cURL call with the specified pipe alias. We recommend adding your Flex.io username as a prefix to all of your aliases.

**NOTE: The alias `examples-demo-upload-to-amazon-s3` below needs to be replaced with your own in order to save this pipe to your account. Best practices for aliases are to use your username as a prefix (e.g. `demo-upload-to-amazon-s3`).**

```javascript
  .save({
    name: 'Upload to Amazon S3',
    alias: 'examples-demo-upload-to-amazon-s3'
  })
```

## Get Help

If you have question or would like more information, please feel free to email the [Flex.io developer support team](support@flex.io) or the chat button at the bottom of the [Flex.io website](https://www.flex.io).
