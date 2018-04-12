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
  .render('${form.url}')
  // this Python script resizes the image from the render call above.
  // The Python script interacts with the Flex.io pipe via the
  // `content.input.read()` and `content.output.write()` methods.
  // The Flex.io code handler `def flexio_handler(context):` is required.
  .python(`
import PIL
from PIL import Image
from io import BytesIO

def flexio_handler(context):
    context.output.content_type = context.input.content_type

    imagedata = context.input.read()
    file_imagedata = BytesIO(imagedata)
    img = Image.open(file_imagedata)
    imgformat = img.format

    basewidth = 160
    wpercent = (basewidth / float(img.size[0]))
    hsize = int((float(img.size[1]) * float(wpercent)))
    img = img.resize((basewidth, hsize), PIL.Image.ANTIALIAS)

    file_output = BytesIO()
    img.save(file_output, format = imgformat)
    file_output.seek(0)
    contents = file_output.getvalue()
    file_output.close()

    context.output.write(contents)
`)

// You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-transfer-copy-files-between-cloud-storage` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `demo-webpage-thumbnail-generator`)
pipe.save({
  name: 'Webpage Thumbnail Generator',
  alias: 'examples-demo-webpage-thumbnail-generator'
})
