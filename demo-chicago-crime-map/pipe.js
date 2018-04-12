// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe logic to upload a file to Amazon S3 and output the link
// Note that the pipe below requires a basic HTML form which posts a number value (2017, 2018, etc.)
// with the `name="year"`
var pipe = Flexio.pipe()
  .request("https://data.cityofchicago.org/api/views/6zsd-86xi/rows.csv?accessType=DOWNLOAD&bom=true&query=select+*+where+%60primary_type%60%3D%27HOMICIDE%27")
  .convert("csv", "table")
  .select("case number","date","block","description","location description","beat","year","latitude","longitude")
  .filter("year = '${form.year}'")
  .convert("table", "json")

// You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-demo-chicago-crime-map` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `demo-chicago-crime-map`)
pipe.save({
  name: 'Chicago Crime Map',
  alias: 'examples-demo-chicago-crime-map'
})

