// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe logic to upload a file to Amazon S3 and output the link
// Note that the aliases below will need to be replaced with your connection aliases (e.g. `filetrans-demo`)
// and a basic upload form which posts a file with the `name="myfile"`. NOTE: connections are set up
// using the Flex.io web app -- https://www.flex.io/app
var pipe = Flexio.pipe()
  .set('filename', '${files.myfile.name}')
  .read("context://files/myfile")
  .write("/examples-filetrans-demo/${filename}")
  .echo('https://s3.amazonaws.com/flexio-filetrans-demo/${filename}')

// You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-demo-upload-to-amazon-s3` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `demo-upload-to-amazon-s3`)
pipe.save({
  name: 'Copy CSV files to Elasticsearch',
  alias: 'examples-demo-upload-to-amazon-s3'
})
