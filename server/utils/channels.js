class Channels{
  constructor(){
    this.channels=[{c_name:'room1'},{c_name:'room2'}];
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
}

module.exports={Channels};