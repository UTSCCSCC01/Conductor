/*
    A singleton class responsible for reacting to dispatcher actions from
    the orchestra web servers via sockets
*/

/* 
    Notes:

    send to dispatcher: auth_keys

    dispatcher can send the following pings
    - heartbeat
    - event-signal
    - appRefresh
    - segkill signal 

    The cognitavit client side app denote it as client-app, sends a auth token to
    the dispatcher server on inital socket connection. If successful the socket
    connection will presist, and will not be terminated. failure will result in a 
    socket termination by server.
    
    Otherwise stated, the client does not send information to the dispatcher, but
    instead sends the information other microservices via a restful api. 
    ie this is a one way communication between the server on client.

    orchestaSocket object listeners require execution from the python script, and the 
    ipc between two is facilitated by the execManager.

    Life-cycle

    Creation:
        prompted by ipc call between main and render, during deviceloader stage
    
    Destruction;
        prompted by signout/page refresh/app closure.  [TODO: later]

*/



import { AuthenticationToken } from '../../types'
import { io, Socket } from "socket.io-client";


class orchestraSocket{
    private static instance: orchestraSocket;
    
    private static authKeys: AuthenticationToken | undefined;
    private static socket: Socket | undefined;

    //to prevent creation of new objects via new operator
    private constructor() {}

    public static getInstance(): orchestraSocket{
        if(!orchestraSocket.instance){
            orchestraSocket.instance = new orchestraSocket();
        }
        return orchestraSocket.instance;
    }

    /*
        Set the necessary information for the sockets to connect to server.
        Invalid auth_keys will result in an auto disconnect.   
    */
    private static setAuthKeys(auth_token: AuthenticationToken){
        orchestraSocket.authKeys = auth_token;
    }


    /* 
        Assume socket object has not been set.  
    */
    public start(auth_token:any /*AuthenticationToken*/){
        //
        if(!auth_token){
            console.log("Set the authentication keys before starting");
            return;
        } 

        // Clear state before starting.
        this.resetConfigs();

        // Set authentication keys
        orchestraSocket.setAuthKeys(auth_token);
          
        // Create the socket object
        orchestraSocket.socket = io("http://localhost:8080", {
            autoConnect: false,
            path: '/entry'
        });

        // Starts the socket
        orchestraSocket.socket.connect();
       
        // Add the event listeners
        orchestraSocket.socket.on("connect", () => {
            orchestraSocket.socket?.emit("auth", JSON.stringify(orchestraSocket.authKeys), (response:any) => {
                console.log(response);
            });
        });

        // Add event listener for refreshing apps
        orchestraSocket.socket.on("refresh-applet-list",(payload:any) => {console.log(payload);});

        // Add event listener for getting events
        orchestraSocket.socket.on("send-event", (payload:any) => {console.log(payload);})
        


        // Returns the socket object. 
        return orchestraSocket.socket;
    }

    
    public resetConfigs(){
        //Remove auth
        orchestraSocket.authKeys = undefined;
        
        //close the socket object if possible, and delete it.
        if(orchestraSocket.socket != undefined){
            try{
                orchestraSocket.socket.disconnect();
                orchestraSocket.socket.close();
            }catch{
                orchestraSocket.socket.close();
            }
        }

        orchestraSocket.socket = undefined;

        // potential bug? 
       // delete orchestraSocket.socket
    }

}

export { orchestraSocket }