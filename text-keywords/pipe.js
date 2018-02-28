// uncomment the following line and insert your API key here to use the Flex.io JS SDK
// Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe which encapsulates all of the logic
// required to read the HTML contents of a webpage, process it
// and output a JSON array of items which can be consumed by D3.js
var pipe = Flexio.pipe()
  // request the content of the website URL that is specified in the HTML form
  .request('${form.url}')
  // this Python script uses BeautifulSoup to parse the HTML
  // of the specified website. The Python script interacts with the
  // Flex.io pipe via the `content.input.read()` and `content.output.write()`
  // methods. The Flex.io code handler `def flexio_handler(context):` is required.
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
  // this Python script removes non-ascii characters and returns an array
  // of JSON objects with { id, value } keypairs. The Python script interacts with the
  // Flex.io pipe via the `content.input.read()` and `content.output.write()`
  // methods. The Flex.io code handler `def flexio_handler(context):` is required.
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
  // convert the JSON from the previous step into tabular format (which is necessary for filtering)
  .convert('json', 'table')
  // filter the items based on the number of times they exist on the website
  .filter('to_number(value) >= ${form.min_threshold} and to_number(value) <= ${form.max_threshold}')
  // run the pipe
  .run()

// You can save all of the logic of this pipe to your account in Flex.io. Saving a pipe is very useful
// as it can now be referenced simply by calling the Flex.io REST API with the specified pipe alias.
// NOTE: be sure to replace `username` with your username below
pipe.save({
  name: 'Webpage Text Bubble Chart',
  ename: 'username-my-alias'
})
