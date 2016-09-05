const express = require('express');
const fs = require('fs');
var multer  =   require('multer');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var fileUpload = null, dirUpload = null, filename = null;
const path = require('path');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
  	if(file.fieldname === 'file'){dirUpload = './upload';}
  	else if(file.fieldname === 'file2'){dirUpload = './upload2';}
    callback(null, dirUpload);
  },
  filename: function (req, file, callback) {
  	if(file.fieldname === 'file'){
  		fileUpload = file.fieldname + '-' + Date.now();
  		filename = fileUpload;
  	}
  	else if(file.fieldname === 'file2'){
  		fileUpload2 = file.fieldname + '-' + Date.now();
  		filename = fileUpload2;
  	}
    console.log(filename);
    callback(null, filename);
  }
});

var upload = multer({ storage : storage}).single('file'),
	upload2 = multer({ storage : storage}).single('file2');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/upload',function(req,res){

    upload(req,res,function(err) {

        if(err) {
            return res.end("Error uploading file.");
        }
        if(fileUpload !== null){
          fs.readFile('./upload/'+fileUpload, (err, data) => {
            if (err) throw err;

            res.send({file: data.toString()}).end();
          });
        }
    });

});

app.post('/upload2',function(req,res){

    upload2(req,res,function(err) {

        if(err) {
            return res.end("Error uploading file2.");
        }
        if(fileUpload2 !== null){
          fs.readFile('./upload2/'+fileUpload2, (err, data) => {
            if (err) throw err;

            res.send({file2: data.toString()}).end();

          });
        }

    });

});

app.set('port', 4000);
app.listen(app.get('port'), () => {
    console.log('Express server listening on port 4000');
});