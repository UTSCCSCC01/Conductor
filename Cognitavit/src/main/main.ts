/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, Menu, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolveHtmlPath } from './util';
import { get_device_id, get_device_hostname, get_platform } from './utils/deviceinfo/deviceInfo';

import { orchestraSocket } from './sockets/orcherstraSocket/orchestraSocket'


//import {get_device_id, get_platform} from './utils/deviceinfo/deviceinfo'



export default class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
    require('electron-debug')();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload
        )
        .catch(console.log);
};

const createWindow = async () => {
    if (isDebug) {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        resizable: false,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../.erb/dll/preload.js'),
            //devTools: false,
        },
    });

    Menu.setApplicationMenu(null);

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });



    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

};

/**
 * Add event listeners...
 */


/**
 * Create a dispatcher socket object. 
 */

 const dispatcher_socket = orchestraSocket.getInstance();

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady()
    .then(() => {
        createWindow();
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow();
        });
    })
    .catch(console.log);

//Handles
//get_device_id, get_platform
ipcMain.handle("get_device_id", async (event, args) => {
    let device_id = get_device_id();
    return device_id;
});

ipcMain.handle("get_platform", async (event, args) => {
    let platform = get_platform();
    return platform;
});


ipcMain.handle("get_hostname", async (event, args) => {
    let hostname_dev = get_device_hostname();
    return hostname_dev;
});



//------------------------------------------------------------------//
ipcMain.handle("start_socket", async (event, auth_tokens) => {
    
    if(!auth_tokens){ return false;}

    let machine_payload = await get_device_id()
    //Generate payload
    let payload = {
        machine_id: machine_payload,
        auth_token: auth_tokens
    }
    console.log(payload);

    //Start the socket connection
    dispatcher_socket.start(payload);
    console.log("Socket has been init");
    return true;
});

ipcMain.handle("destroy_socket", async (event, args) => {
    //Destroy the socket
    console.log("Socket has been destroyed");
    dispatcher_socket.resetConfigs();
    return true;
});

ipcMain.handle("start_executor", async (event, args) => {
    //to be implemented later
    let hostname_dev = get_device_hostname();
    return hostname_dev;
});
    //to be implemented later.
ipcMain.handle("destroy_executor", async (event, args) => {
    dispatcher_socket.resetConfigs();

});

//-----------------------------------------------------------------//

/**
 * init_socket: (auth_token: AuthenticationToken) => ipcRenderer.invoke("start_socket", auth_token),
    destroy_socket: () => ipcRenderer.invoke("destroy_socket"),
    init_exec: (auth_token: AuthenticationToken) => ipcRenderer.invoke("start_executor", auth_token),
    destroy_exec: () => ipcRenderer.invoke("destroy_executor"),
 */






//Handles for executor.py

/* 
    These are all routes in the exector.py file
    Getters

    1. get_app_list -> returns a list applications running, and list of custom binaries
    2. get_store_list -> returns a list of installed orchestra web applications [BOTS]
    3. get_status_exec -> returns true [if anything else then python executors not running]

    Execution fxns
    1. execute_app(event) -> executes a event, and sends a status report to the status-aggregator microservice
    2. uninstall_app(event): remove shortcut + any leftover binaries. 
    2. refresh_bot_list(event) -> get list of bots from user-device, compare with internal, and install. (install means adding a shortcut to /cognitavit/userid/storeapps/<shortcut>) 
    3. refresh_appList(event) -> gets list of applications/custom binaries and send a update to orchestra user-device service with new list of apps installed + binaries
    4. execute_app(name) -> executes a app.
 

*/




