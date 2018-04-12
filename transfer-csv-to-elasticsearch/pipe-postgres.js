// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe logic to read a table from Posgres and write it to Elasticsearch
// Note that the aliases below will need to be replaced with your connection aliases (e.g. `postgres`)
var pipe = Flexio.pipe()
  .read('/tutorial-postgres/contacts')
  .write('tutorial-elasticsearch/contacts')

// You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-transfer-csv-to-elasticsearch` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `transfer-csv-to-elasticsearch`)
pipe.save({
  name: 'Copy CSV files to Elasticsearch',
  alias: 'examples-transfer-csv-to-elasticsearch'
})
