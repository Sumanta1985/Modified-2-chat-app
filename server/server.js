const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');
const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isStringValid}=require('./utils/validate');
var {Users}=require('./utils/users');
var {Channels}=require('./utils/channels');

const port=process.env.PORT||3000;

const app=express();
const server=http.createServer(app);
const publicPath=path.join(__dirname,'../public');

var user=new Users();
var channel=new Channels();

var io=socketIO(server);  //web socket server
//server is ready to accept new connections

app.use(express.static(publicPath));

io.on('connection',(socket)=>{ //lets you listen for new connection and let's you do something in 2nd argument
  console.log("new user connected");
  console.log("socketid",socket.id);
  socket.emit('getchannels',channel.getchannels());

  socket.on('join',(param,callback)=>{
    var name=param.name;
    var c_name=param.c_name;

    if (isStringValid(name) && isStringValid(c_name)){
      socket.join(c_name);
      user.removeuser(socket.id); //needed to remove the user from other channels
      user.adduser(socket.id,name,c_name);
      channel.addchannel(c_name);

      // console.log('user.getuser:',user.getuser(socket.id));

      io.to(param.c_name).emit('userlist',user.getuserlist(c_name));
      socket.emit('NewChat',generateMessage('Admin','Welcome to chat group'));
      socket.broadcast.to(param.c_name).emit('NewChat',generateMessage('Admin',`${name} joined`));
      callback();
    }else{
      callback("Please provide valid name and channel");
    }
  });

//  socket.emit('NewChat',generateMessage('Admin','Welcome to chat group'));
//  socket.broadcast.emit('NewChat',generateMessage('Admin','New user joined'));

  socket.on('createNewchat',function(NewChat,callback){
    io.to(NewChat.from.c_name).emit('NewChat',generateMessage(NewChat.from.name,NewChat.text));
    callback({text:'this is from server'});
  });

  socket.on('Newuserlocation',(location,callback)=>{
    var l_user=user.getuser(socket.id);
    io.to(l_user[0].c_name).emit('UserLocation',generateLocationMessage(location.from,location.latitude,location.longitude));
    callback();
  });


  socket.on('disconnect',()=>{
    console.log('Client connection closed');
    // var remove_user=user.getuser(socket.id);
    // console.log("socketid",socket.id);
    var remove_user=user.removeuser(socket.id);
    if (remove_user.length > 0) {
      io.to(remove_user[0].c_name).emit('userlist',user.getuserlist(remove_user[0].c_name));
      var userNames=user.getuserlist(remove_user[0].c_name);
      if (userNames.length === 0){
        channel.removeChannel(remove_user[0].c_name);
      }
      // console.log('removed user:',remove_user);
      // console.log('users:',user);
      socket.broadcast.to(remove_user[0].c_name).emit('NewChat',generateMessage('Admin',`${remove_user[0].name} has left`));
    }
  });
});

// app.get('/',(req,res)=>{
//   console.log('document',req);
// });

server.listen(port,()=>{
  console.log(`Server started at port ${port}`);
});
