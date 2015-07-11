import AWS from 'aws-sdk';
import fs from 'fs';
import express from 'express';

const credentials = new AWS.SharedIniFileCredentials({profile: 'web-intro'});
AWS.config.credentials = credentials;

const s3 = new AWS.S3();
const app = express();

function uploadFile() {
  var body = fs.createReadStream('./test.html');

  s3.upload({
      ACL: 'public-read',
      Body: body,
      Bucket: 'web-intro',
      Key: 'test.html',
      ContentType: 'text/html'
    })
    .on('httpUploadProgress', function(evt) { console.log(evt);  })
    .send(function(err, data) { console.log(err, data)  });
}

app.get('/ping', function(req, res) {
  res.send('Pong!');
});

app.listen(3000);
