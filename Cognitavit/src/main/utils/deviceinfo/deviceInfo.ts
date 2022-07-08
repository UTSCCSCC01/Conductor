import { machineId } from 'node-machine-id';
import { platform } from 'node:process';
import os from "os";
 



async function get_device_id(){
    let user_id = machineId();
    return user_id;
}

async function get_platform(){
    return platform;
}

async function get_device_hostname(){
    return os.hostname()
}

export {get_device_id, get_platform, get_device_hostname}