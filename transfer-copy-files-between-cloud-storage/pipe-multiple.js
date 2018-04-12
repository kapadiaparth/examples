// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe logic to read all files from an AWS S3 directory and write them to Dropbox
// Note that the aliases below will need to be replaced with your connection aliases (e.g. `s3`)
var pipe = Flexio.pipe()
  .list('/tutorial-s3')
  .foreach(
    Flexio.pipe()
      .read('/tutorial-s3/${item.name}')
      .write('/tutorial-dropbox/backup-${process.time.unix}/${item.name}')
  )

// You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-transfer-copy-files-between-cloud-storage` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `transfer-copy-files-between-cloud-storage`)
pipe.save({
  name: 'Copy Multiple Files Between Cloud Storage',
  alias: 'examples-transfer-copy-files-between-cloud-storage'
})
