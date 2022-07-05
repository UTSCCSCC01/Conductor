import { machineId } from 'node-machine-id';
import { platform } from 'node:process';

async function get_device_id(){
    let user_id = machineId();
    return user_id;
}

async function get_platform(){
    return platform;
}


export {get_device_id, get_platform}