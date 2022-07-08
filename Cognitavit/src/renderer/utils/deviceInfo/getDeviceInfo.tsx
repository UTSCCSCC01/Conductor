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

export {get_device_info}