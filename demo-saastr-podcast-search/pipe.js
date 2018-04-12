// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe logic to read a CSV file from GitHub,
// convert it to a table, select a subset of columns, filter it based
// on a search string from an HTML input and output the result in JSON.
var pipe = Flexio.pipe()
  .request("https://raw.githubusercontent.com/flexiodata/examples/master/demo-saastr-podcast-search/source-data/saastr-podcast-20170205.csv")
  .convert("csv", "table")
  .select("url","title","description","date","guest","position","company","category","biggest challenge","saas resources","notes")
  .filter("contains(lower(concat(title,description,notes,[saas resources])),lower('${form.filter}'))")
  .convert("table", "json")

// You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-demo-saastr-podcast-search` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `demo-saastr-podcast-search`)
pipe.save({
  name: 'Copy CSV files to Elasticsearch',
  alias: 'examples-demo-saastr-podcast-search'
})


