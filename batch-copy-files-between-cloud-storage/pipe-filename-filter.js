// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// TODO (replace with your text): This is the Flex.io pipe which encapsulates all of the logic
// required to read the CSV files and output them to Elasticsearch
var pipe = Flexio.pipe()
  .list('/tutorial-s3/file-2017*.csv')
  .foreach(
    Flexio.pipe()
      .read('/tutorial-s3/${item.name}')
      .write('/tutorial-dropbox/backup-${process.time.unix}/${item.name}')
  )


// You may save your pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-batch-copy-files-between-cloud-storage` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `{username}-batch-copy-files-between-cloud-storage`)
pipe.save({
  name: 'Copy Files Between Cloud Storage (filter on name)',
  ename: 'examples-batch-copy-files-between-cloud-storage'
})
