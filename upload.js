const fs = require('fs');
const path = require('path');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const boundary = event.headers['content-type'].split('boundary=')[1];
  const body = event.body.split(`--${boundary}`);

  const fileData = body[1].split('\r\n\r\n')[1].split('\r\n--')[0];

  const uploadPath = path.join('/tmp', 'uploaded_file');
  fs.writeFileSync(uploadPath, fileData, { encoding: 'binary' });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'File uploaded successfully',
      path: uploadPath, // Include the file path in the response
    }),
  };
};
