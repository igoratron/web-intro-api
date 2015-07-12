import AWS from 'aws-sdk';
import fs from 'fs';
import express from 'express';
import multer from 'multer';

const s3 = new AWS.S3();
const app = express();

app.use(multer({
  inMemory: true
}));

function uploadFile(file) {
  return new Promise(function(resolve, reject) {
    s3.upload({
        ACL: 'public-read',
        Body: file,
        Bucket: 'web-intro',
        Key: 'test.html',
        ContentType: 'text/html'
      })
      .send(function(err, data) {
        if(err) {
          reject(err);
          return;
        }
        resolve(data);
      });
  });
}

app.post('/upload', function(req, res) {
  const file = req.files.webpage.buffer;

  uploadFile(file)
    .then(function(data) {
      res.status(200)
        .send(data);
    })
    .catch(function(error) {
      res.status(500)
        .send(error);
    })
});

app.listen(process.env.PORT || 3000, function() {
    console.log(Date(), 'server started');
});
