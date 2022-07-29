import { Channels } from 'main/preload';
import { AuthenticationToken } from './types';

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                sendMessage(channel: Channels, args: unknown[]): void;
                on(
                    channel: string,
                    func: (...args: unknown[]) => void
                ): (() => void) | undefined;
                once(channel: string, func: (...args: unknown[]) => void): void;
            };
        };
        //Register the ipc function calls to be visible in main window.
        registration_device: {
            get_device_id(): Promise<any>;
            get_platform(): Promise<any>;
            get_hostname(): Promise<any>;
        }

        
        //Load authentication keys to main

        exec_calls: {
            init_socket: (auth_token: AuthenticationToken) => Promise<any>,
            destroy_socket: () => Promise<any>,
            init_exec: (auth_token: AuthenticationToken) => Promise<any>,
            destroy_exec: () => Promise<any>,
        }

 


    }
}

export {};
