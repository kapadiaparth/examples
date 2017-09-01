def flexio_handler(input, output):
    writer = output.create(name='Hello')
    if 'message' in input.env:
        writer.write(input.env['message'])
    else:
        writer.write('Hello, World!')

