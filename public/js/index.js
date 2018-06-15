var socket = io();

socket.on('connect',function(){
  console.log("connected to server from index.html");
  socket.on('getchannels',(channels)=>{
    console.log("channels",channels);

    var options=jQuery('<option></option>');
    channels.forEach((channel)=>{
      console.log("channel",channel);
      options.text(channel.c_name);
      jQuery('#channel').append(options);
    });

    // var str='';
    // channels.forEach((channel)=>{
    //   console.log("channel",channel);
    //   str += `<option value=${channel.c_name}/>`
    //
    // });
    // jQuery('#channel').innerHTML=str;
});
});


socket.on('disconnect',function(){
  console.log("Disconnected from Server from ");
  // var param=jQuery.deparam(window.location.search);
  // socket.emit('exit',param);
});
