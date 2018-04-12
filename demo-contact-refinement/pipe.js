// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe logic to read a CSV file from GitHub,
// convert it to a table, select a subset of columns, transform all
// text to uppercase and output the result in JSON.
var pipe = Flexio.pipe()
  .request("https://raw.githubusercontent.com/flexiodata/examples/master/demo-contact-refinement/source-data/contacts-ltd1.csv")
  .convert("csv", "table")
  .select("givenname","surname","streetaddress","city","state","zipcode")
  .transform({ "columns": [ "givenname", "surname", "streetaddress", "city" ], "operations": [{ "operation": "case", "case": "upper" }] })
  .convert("table", "json")

// You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-demo-contact-refinement` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `demo-contact-refinement`)
pipe.save({
  name: 'Contact Refinement',
  alias: 'examples-demo-contact-refinement'
})


