var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(5000,()=>console.log('connected to 5000'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});

require('./services/socket')(io);
