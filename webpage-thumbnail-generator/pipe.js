// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe which encapsulates all of the logic
// required to read the HTML contents of a webpage, process it
// and output as a PNG image
var pipe = Flexio.pipe()
  // request the content of the URL that is specified and render it to PNG
  .render({
    url: '${form.url}',
    format: 'png', // 'png' or 'pdf'
    width: 400,
    height: 300,
    scrollbars: false
  })

// Flex.io pipes can contain quite a bit of logic and code -- this is one thing that differentiates Flex.io from
// other serverless offerings. We can save all of the logic of this pipe to your account in Flex.io. Saving a pipe
// is very useful as it will allow it to be called via the REST API or a cURL call with the specified pipe alias.

// NOTE: The alias `flexio-webpage-thumbnail-generator-v1` below needs to be replaced with your own in order to
//       save this pipe to your account. Best practices for aliases are to use your username
//       as a prefix (e.g. `username-webpage-thumbnail-generator-v1`)
pipe.save({
  name: 'Webpage Thumbnail Generator',
  ename: 'flexio-webpage-thumbnail-generator-v1'
})
