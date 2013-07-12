var express = require('express'),fs=require('fs'),r app = express.createServer(express.logger());
fs.readFile('index.html',function(err,data){

app.get('/', function(request, response) {
  response.send(data);
});});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
