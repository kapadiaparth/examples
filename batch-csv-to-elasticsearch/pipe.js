// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe which encapsulates all of the logic
// required to read the CSV files and output them to Elasticsearch
var pipe = Flexio.pipe()
  .read('/tutorial-dropbox/es/contacts.csv')
  .convert('csv','table')
  .write('/tutorial-elasticsearch/contacts.csv')

// Flex.io pipes can contain quite a bit of logic and code -- this is one thing that differentiates Flex.io from
// other serverless offerings. We can save all of the logic of this pipe to your account in Flex.io. Saving a pipe
// is very useful as it will allow it to be called via the REST API or a cURL call with the specified pipe alias.

// NOTE: The alias `examples-batch-csv-to-elasticsearch` below needs to be replaced with your own in order
//       to save this pipe to your account. Best practices for aliases are to use your username
//       as a prefix (e.g. `username-batch-csv-to-elasticsearch`)
pipe.save({
  name: 'Copy CSV files to Elasticsearch',
  ename: 'examples-batch-csv-to-elasticsearch'
})
