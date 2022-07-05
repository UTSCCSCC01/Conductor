import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

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
    get_platform: () => ipcRenderer.invoke("get_platform")
    
    //Does not follow standard
    //Api calls involving internal os api calls should be allowed for api.
    //check_device_registration: () => ipcRenderer.invoke("registration_check"),
   // register_device: () => ipcRenderer.invoke("register_device"),
});
