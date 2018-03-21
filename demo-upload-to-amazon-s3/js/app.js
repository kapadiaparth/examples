(function(window, document, Flexio, undefined) {
  // setup Flexio SDK with our API key
  Flexio.setup('rryrjgqhvtdttzzsjpjr')

  var form = document.getElementById('upload-form')
  var file_input = document.getElementById('file')
  var submit_btn = document.getElementById('submit')

  form.addEventListener('submit', function(evt) {
    // prevent default form processing
    evt.preventDefault()

    // grab multipart form data on submit
    var formdata = new FormData(form)

    // Flex.io pipe that uploads a file to Amazon S3
    // and echoes back the URL of the file on S3
    Flexio.pipe()
      // set the `filename` variable to the name of the file we're uploading
      .set('filename', '${files.myfile.name}')
      // read the file from the HTML upload form into the pipe
      .read("context://files/myfile")
      // write the file to the Flex.io S3 connection identified by the 'examples-filetrans-demo' alias;
      // connections are set up using the Flex.io web app -- https://www.flex.io/app
      .write("/examples-filetrans-demo/${filename}")
      // output the URL of the file on S3 using the `filename` variable from above
      .echo('https://s3.amazonaws.com/flexio-filetrans-demo/${filename}')
      // run the pipe
      .run({ data: formdata }, function(err, response) {
        document.getElementById('info').innerHTML = '' +
          '<strong>Your download link is:</strong><br><a href="' + response.text + '">' + response.text + '</a>'
      })
  })

  // enable submit button once we've selected a file to upload
  file_input.addEventListener('change', function(evt) {
    submit_btn.classList.remove('o-40')
    submit_btn.classList.add('darken-10', 'pointer')
    submit_btn.removeAttribute('disabled')
  })

})(window, document, Flexio)
