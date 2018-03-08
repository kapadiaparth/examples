# Copy Files Between Cloud Storage

This demo does the following

## Overview

Flex.io is the API for data feeds. In this demo, we'll take you through the steps necessary to create a serverless data feed which parses a webpage and returns a JSON payload of the most-used words.

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
