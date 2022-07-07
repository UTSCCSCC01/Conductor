/* 
File contains a list of functions for query device information via the ipc main process. 
Information collected is as follows
- deviceID [ipc] [done]
- deviceName [ipc (os module)]
- platform [ipc (os module)]

*/
//Returns an ordered tuple of deviceuuid, platform, hostname. 
async function get_device_info(){
    const [deviceUUID, platform, hostname] = await Promise.all([window.registration_device.get_device_id(),
        window.registration_device.get_platform(), window.registration_device.get_hostname()])
    return [deviceUUID, platform, hostname]
}

function device_type_to_arr(name:string){
    if(name === 'win32'){
        return [0,0,0,1];
    }else if(name === 'darwin'){
        return [0,1,0,0];
    }else if(name === 'linux'){
        return [0,0,1,0]
    }else{
        return [0,0,0,0]
    }
}

export {get_device_info, device_type_to_arr}