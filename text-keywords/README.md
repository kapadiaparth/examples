# Webpage Text Bubble Chart

This demo uses the Flex.io Javascript SDK to parse the HTML contents of the webpage and return a wordcloud of the words on that page.

## Overview

TODO: Do we need/want something else here? Common copy we can reuse in all of our demo apps?

Flex.io is the API for data feeds. In this demo, we'll take you through the steps necessary to create a serverless data feed which parses a webpage and returns a JSON payload of the most-used words.

## Installation

### Node.js

The preferred way of installing the Flex.io SDK for Node.js is to use [NPM](https://www.npmjs.com/), the Node.js package manager. Simply go to your project's directory and enter the following command at the command prompt:

```
npm install flexio-sdk-js
```

## Setup

You will need an API key in order to use the Flex.io Javascript SDK. You can generate an API key by logging into your account on Flex.io.

```
Flexio.setup('YOUR_API_KEY')
```

## Code

All of the code that we'll build up in this example can be found in the [pipe.js](./pipe.js) in this repository.

## Steps

All Flex.io pipes start with `Flexio.pipe()`. Tasks in a pipe are chained together using periods similar to how jQuery and other APIs chain calls together.

```
Flexio.pipe()
```

### Request

The `request` task allows you to request the contents of a specific URL. Doing the following will issue a web request to get the contents of the Flex.io homepage.

```
  .request('https://www.flex.io')
```

### Python

The `python` tasks allows you to run Python code inside of the Flex.io pipe in order to generate new content or to manipulate other content in the pipe. We will use two small Python scripts in this pipe.

The first Python script uses [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) to parse the HTML of webpage specified in the `request` task above. The Python script interacts with the Flex.io pipe via the `content.input.read()` and `content.output.write()` methods. The Flex.io code handler `def flexio_handler(context):` is required.

```
  .python(`
from bs4 import BeautifulSoup

def flexio_handler(context):

    content = context.input.read()
    soup = BeautifulSoup(content, "html.parser")
    for script in soup(["script", "style"]):
        script.extract()
    text = soup.get_text()
    lines = (line.strip() for line in text.splitlines())
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    text = '\n'.join(chunk for chunk in chunks if chunk)
    context.output.content_type = 'text/plain'
    context.output.write(text.encode('utf-8','ignore'))
`)
```

The second Python script removes non-ascii characters and returns an array of JSON objects with { id, value } keypairs.

```
  .python(`
import json
from collections import defaultdict

def remove_non_ascii(text):
    return ''.join([i if ord(i) < 128 else ' ' for i in text])

def flexio_handler(context):

    content = context.input.read()
    content = content.decode()
    content = content.lower()

    d = defaultdict(int)
    for word in content.split():
        if len(word) > 3:
            d[word] += 1

    result = []
    for key, value in d.items():
        if value > 1:
            i = {"id": remove_non_ascii(key), "value": value}
            result.append(i)

    context.output.content_type = "application/json"
    context.output.write(json.dumps(result))
`)
```

### Convert

The `convert` task allows you to convert the input from one format to another. In this particular step, we'll convert the out of the Python script above from JSON into a tabular format.

```
  .convert('json', 'table')
```

### Filter

The `filter` task allows us to output a reduced set of data from the input by apply a `where` condition.

```
  .filter('to_number(value) >= ${form.min_threshold} and to_number(value) <= ${form.max_threshold}')
```  

### Running the pipe in your Javascript code

Flex.io pipes can be run in your Javascript code right away without needing to be saved externally.

```
  .run()
```

### Saving the pipe for later use

Once your pipe is doing exactly what you'd like, you may save it for later use. Assigning an alias to the pipe allows the pipe to be run simply by issue a REST API call. We recommend adding your Flex.io username as a prefix to all of your aliases.

```
  .save({
    name: 'Webpage Text Bubble Chart',
    ename: 'username-my-alias'
  })
```

This is how you can run the saved pipe via an HTTP or cURL request:

```
https://localhost/api/v1/pipes/username-my-alias/run?flexio_api_key=YOUR_API_KEY
```

```
curl -X POST 'https://localhost/api/v1/pipes/username-my-alias/run' -H 'Authorization: Bearer YOUR_API_KEY'
```

## Conclusion

We hope you've enjoyed stepping through this demo and have found it useful. If you have question or would like more information, please feel free to email the [Flex.io developer support team](support@flex.io).
