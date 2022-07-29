import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { AuthenticationToken } from '../main/types'

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]) {
            ipcRenderer.send(channel, args);
        },
        on(channel: Channels, func: (...args: unknown[]) => void) {
            const subscription = (
                _event: IpcRendererEvent,
                ...args: unknown[]
            ) => func(...args);
            ipcRenderer.on(channel, subscription);

            return () => ipcRenderer.removeListener(channel, subscription);
        },
        once(channel: Channels, func: (...args: unknown[]) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
    },
});



//Device Information and Registration. 
contextBridge.exposeInMainWorld("registration_device", {
    get_device_id: () => ipcRenderer.invoke("get_device_id"),
    get_platform: () => ipcRenderer.invoke("get_platform"),
    get_hostname: () => ipcRenderer.invoke("get_hostname")
    //Does not follow standard
    //Api calls involving internal os api calls should be allowed for api.
    //check_device_registration: () => ipcRenderer.invoke("registration_check"),
   // register_device: () => ipcRenderer.invoke("register_device"),
});

//IPC calls for starting the 
contextBridge.exposeInMainWorld("exec_calls", {
    init_socket: (auth_token: AuthenticationToken) => ipcRenderer.invoke("start_socket", auth_token),
    destroy_socket: () => ipcRenderer.invoke("destroy_socket"),
    init_exec: (auth_token: AuthenticationToken) => ipcRenderer.invoke("start_executor", auth_token),
    destroy_exec: () => ipcRenderer.invoke("destroy_executor"),
});
