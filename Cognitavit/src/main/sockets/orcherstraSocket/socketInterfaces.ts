
interface ServerToClientEvents {
    refreshApplist: () => any;
    //structure of Event object hasn't been mapped out yet
    sendEvent: (Event: any) => any;
}

interface ClientToServerEvents {
    auth: (auth: string) => any;
}