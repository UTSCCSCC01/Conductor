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
 import { execManager } from './sockets/execSocket/execManager';
 
 const { execFile } = require('node:child_process');
 
 //import {get_device_id, get_platform} from './utils/deviceinfo/deviceinfo'
 
 
 //Application Store
 const Store = require('electron-store');
 const store = new Store();
 
 //store.set("key test 1", "value test 1");
 
 
 console.log(app.getPath('userData'));
 
 
 //make it cross platform later.
 // get os type, and change core.exe to core.bin or to specific core os
 const RESOURCES_PATH_EXECUTABLE = app.isPackaged
         ? path.join(process.resourcesPath, '/src/main/execbuild')
         : path.join(__dirname, '/execbuild');
 
 const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH_EXECUTABLE, ...paths);
 };
     
 
 
 
 
 
 
 
 
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

 const dispatcher_socket = orchestraSocket.getInstance();
 const execSocket = execManager.getInstance();


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
 
 //We are gonna hook the trigger socket to the orchestra dispatcher socket
 //If connection to orchestra fails / trigger socket state will be undefined.

 
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
     console.log("Orchestra Dispatcher socket has started.")

     //Start the trigger socket 
     let platform = await get_platform(); 
     let executable_path = getAssetPath("core.exe");
     let appData_path = app.getPath('userData');

    /** Code goes above */
     execSocket.start(auth_tokens.localId, appData_path, platform , executable_path, machine_payload);
     console.log("Trigger socket has been started.");

     return true;
 });
 
 ipcMain.handle("destroy_socket", async (event, args) => {
     //Destroy the socket
     dispatcher_socket.resetConfigs();
     execSocket.resetConfigs();
     console.log("Orchestra and Trigger socket process has recieved sigkill");
     return true;
 });


 ipcMain.handle("proc_bus", async (event, route_info) => {
    console.log(route_info);
    let route = route_info[0];
    let payload = route_info[1];
    [route,payload] = route_info;

    if(route == undefined){return false;}
    
    console.log("sending results");
    console.log(route,payload);

    let data = await execSocket.sendRequest(route,payload)
    console.log(data);

    return data;
});

 
 
 