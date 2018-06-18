class Channels{
  constructor(){
    this.channels=[];
  }

  addchannel(c_name){
    var channel={c_name};
    var findChannels=this.channels.filter(channel=>channel.c_name===c_name);

    if (findChannels.length>0){
      console.log("Channel already present");
    }else{
      this.channels.push(channel);
    }
    return this.channels;
  }

  getchannels(){
    return this.channels;
  }

  removeChannel(c_name){
    //returns an array excluding the user
    // var user=this.getuser(id);
    this.channels=this.channels.filter(channel=>channel.c_name!=c_name);
    // return user;
  }

  // getChannel(id){
  //   var user=this.users.filter(user=>user.id===id);
  //   return user;
  // }
}

module.exports={Channels};
