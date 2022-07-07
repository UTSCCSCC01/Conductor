import { Channels } from 'main/preload';

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

    }
}

export {};
