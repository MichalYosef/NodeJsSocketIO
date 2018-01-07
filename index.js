var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

let users = {};


io.on('connection', function(socket){

    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    io.emit('getUser','Please insert a username:');

    socket.on('username', function(name){
        let key = socket.id ;
        console.log("socket.id on username: " + socket.id);
        users[key] = name ;

        console.log("users: " +  users[key] );
      });

    socket.on('chat message', function(msg){
        let key = socket.id;
        console.log("socket.id on chat message: " + socket.id);
        console.log("users: " + users);
      io.emit('chat message', users[key] + ": " + msg);
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});