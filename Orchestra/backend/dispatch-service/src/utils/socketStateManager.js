let device_connection = {}
let socket_association = {}

function register_device(userid, deviceid, socketid){
   let universal_id = userid + "." + deviceid;
   socket_association[socketid] = universal_id
   device_connection[universal_id] = socketid;
   console.log("Registered device: " + socket_association[socketid], "socketid: " + device_connection[universal_id])
}

function deregister_device_socket(socket_id){
   let universal_id = socket_association[socket_id];
   if(universal_id){
      socket_association[socket_id] = undefined;
      device_connection[universal_id] = undefined;
       delete socket_association[socket_id]
       delete device_connection[universal_id];
      // console.log("\nSanity Check, expecting undefined: socketid: " + socket_association[socket_id], "\ndevice connection: " + device_connection[universal_id] + "\n")
   }else{
      console.log("SockerID Association: NOT VALID");
   }  
   //console.log("de-auth:" + socket_id);
   return;
}

function is_device_online(userid, deviceid){
   let universal_id = userid + "." + deviceid;
   //console.log("conditional variant:", device_connection[universal_id]);
   if(device_connection[universal_id]){
       //console.log("Device is online.", userid, deviceid);
       return true;
   }
   //console.log("Device is offline", userid, deviceid);
   return false;
}

function is_socket_auth(socketid){
   let socket_num = socket_association[socketid];
   //console.log(socket_num);
   if(socket_num){
       return true;
   }
   return false;
}

function get_socket_id(deviceid, userid){
  // console.log(device_connection);
  // console.log(socket_association);
   if(userid == undefined || deviceid == undefined){
      return -1;
   }
   let universal_id = userid + "." + deviceid;
   if(is_device_online(userid, deviceid)){
      //console.log("internal socketid", device_connection[universal_id]);
      return device_connection[universal_id]
   }else{
      return -1;
   }
}

module.exports.register_device = register_device;
module.exports.deregister_device_socket = deregister_device_socket;
module.exports.is_device_online = is_device_online;
module.exports.is_socket_auth = is_socket_auth;
module.exports.get_socket_id = get_socket_id;