var socket = io();

socket.on('connect',function(){
  console.log("connected to server from index.html");
  console.log("socketid in index.js",socket.id);
  socket.on('getchannels',(channels)=>{
    console.log("channels",channels);

    channels.forEach((channel)=>{
      var options=jQuery('<option></option>');
      console.log("channel",channel);
      options.text(channel.c_name);
      jQuery('#channel').append(options);
    });
  });
});


socket.on('disconnect',function(){
  console.log("Disconnected from Server from Index page");
});
