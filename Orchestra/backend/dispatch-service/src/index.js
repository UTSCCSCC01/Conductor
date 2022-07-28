const express = require("express");
const app = express();
const cors = require('cors')

const server = app.listen(3000, () => {
    console.log("Listening on port: " + 3000);
});

const {
    register_device,
    deregister_device_socket,
    is_device_online,
    is_socket_auth,
    get_socket_id
} = require('./utils/socketStateManager.js')

const {
    auth_verify
} = require("./utils/authVerifier");

const {
    Server
} = require("socket.io");

const io = new Server(server, { path: '/dispatch'});
io.on('connection', connected);


app.use(cors())
app.use(express.json())



/* 
    Request
    deviceid: ...
    userid: ...
    auth_tokens: [INTERNAL_SERVER_TOKEN]
 
    Respose
    success: true/false
    message: "error message or something"

*/



/*Given a header, maps the output to the correct socket stream. */
const DEVICE_OFFLINE = 0
const DEVICE_NOT_RESPONDING = 1
const DEVICE_PAYLOAD_DELIVERED = 2

async function payload_bus_stream(device_id, user_id, payload, stream_event) {
    let is_online = await is_device_online(user_id, device_id);
    if (!is_online) {
        console.log("Failure to send bus: client offline");
        return DEVICE_OFFLINE;
    }
    //Precondition Device is online.
    try {
        io.to(get_socket_id(device_id, user_id)).emit(stream_event, payload);
        return DEVICE_PAYLOAD_DELIVERED;
    } catch {
        return DEVICE_NOT_RESPONDING;
    }
}


/*Verifies the request_body payload. future: make it a middleware next time?*/
const INVALID_PAYLOAD = 0;
const GOOD_PAYLOAD = 1;
async function verify_dispatch_request_body(req, res) {
    let user_id;
    let device_id;

    try {
        device_id = req.body["device_id"];
        user_id = req.body["user_id"];
    } catch {
        console.log(req);
        res.status(400).json({
            status: false,
            online: false,
            message: "Malformed json response. Not found."
        })
        return INVALID_PAYLOAD;
    };

    if (!device_id || !user_id) {
        res.status(400).json({
            status: false,
            online: false,
            message: "Malformed json response."
        })
        return INVALID_PAYLOAD;
    }
    return GOOD_PAYLOAD;
}

/* 
    Request
    deviceid: ...
    userid: ...
    auth_tokens: <>

    Respose
    status: true/false
    online: online/offline
    message: "error message or something"

*/
app.post('/dispatch/device-connected', async (req, res) => {
    let request_validity = await verify_dispatch_request_body(req, res);
    if (request_validity != GOOD_PAYLOAD) {
        return;
    }

    let device_id = req.body["device_id"];
    let user_id = req.body["user_id"];
    let status = await is_device_online(user_id, device_id)
    console.log("Device status:", status);
    if (status == true) {
        res.status(200).json({
            status: true,
            online: true,
            message: "User/Device pair is online."
        })
    } else {
        res.status(400).json({
            status: true,
            online: false,
            message: "User/Device pair is offline."
        })
    }
})


app.post('/dispatch/refresh-applet-list', async (req, res) => {
    let request_validity = await verify_dispatch_request_body(req, res);
    if (request_validity != GOOD_PAYLOAD) {
        return;
    }

    let device_id = req.body["device_id"];
    let user_id = req.body["user_id"];
    let payload = {
        message: "Server has requested for an app refresh. Either at user request, or for bot installation."
    }

    let bus_response = await payload_bus_stream(device_id, user_id, payload, "refresh-applet-list")

    if (bus_response == DEVICE_OFFLINE) {
        res.status(400).json({
            status: false,
            online: false,
            message: "Device is offline"
        })
        return;
    } else if (bus_response == DEVICE_NOT_RESPONDING) {
        res.status(400).json({
            status: false,
            online: true,
            message: "Device is online but is not responding"
        })
        return;
    } else if (bus_response == DEVICE_PAYLOAD_DELIVERED) {
        res.status(200).json({
            status: true,
            online: true,
            message: "Refresh request has been sent to the device."
        })
        return;
    } else {
        console.log("BUS response has returned an unknown value.");
        res.status(500).json({
            status: null,
            online: null,
            message: "BUS response has returned an unknown value."
        })
    }
    return;
})

app.get('/dispatch/entry');

/*
    request:
        -device_id
        -user_id
        -event_obj
    response: Fire and Forget. Client responsiblity for ack via seperate microservice
        - response_sent: true/false
        - online: true/false
        - message: "message"
*/
app.post('/dispatch/send-event', async (req, res) => {
    let request_validity = await verify_dispatch_request_body(req, res);
    if (request_validity != GOOD_PAYLOAD) {
        return;
    }

    let device_id = req.body["device_id"];
    let user_id = req.body["user_id"];
    let event = req.body["event"];

    let payload = event;
    let bus_response = await payload_bus_stream(device_id, user_id, payload, "send-event")

    if (bus_response == DEVICE_OFFLINE) {
        res.status(400).json({
            status: false,
            online: false,
            message: "Device is offline"
        })
        return;
    } else if (bus_response == DEVICE_NOT_RESPONDING) {
        res.status(400).json({
            status: false,
            online: true,
            message: "Device is online but is not responding"
        })
    } else if (bus_response == DEVICE_PAYLOAD_DELIVERED) {
        res.status(200).json({
            status: true,
            online: true,
            message: "Event has been sent to the device. Acknowledgment will be known if the device has sends a status update."
        })
    } else {
        console.log("BUS response has returned an unknown value.");
        res.status(500).json({
            status: null,
            online: null,
            message: "BUS response has returned an unknown value."
        })
    }
    return;
})


/* --------------------------CONNECTION REGION----------------------------*/

const VALID_MACHINE_ID = 1;
const INVALID_MACHINE_ID = 0;
function valid_machine_id(payload) {
    if (payload == undefined) {
        return INVALID_MACHINE_ID;
    }

    let machine_id;
    try {
        machine_id = payload.machine_id;
    } catch {
        return INVALID_MACHINE_ID;
    }

    if (!machine_id) {
        return INVALID_MACHINE_ID;
    }

    if (!(typeof machine_id === "string")) {
        return INVALID_MACHINE_ID;
    }
    if (machine_id.trim().length == 0) {
        return INVALID_MACHINE_ID;
    }

    return VALID_MACHINE_ID;
}

async function connected(socket, data) {
    console.log("device has connected with socketid: " + socket.id);
    socket.on('auth', async (data, callback) => {
        let payload = (JSON.parse(data));
        let status = valid_machine_id(payload);
        //console.log("is valid type" + status, "machine_id", payload.machine_id);
        if(status == INVALID_MACHINE_ID){
            socket.disconnect();
            console.log("device has disconnected due to invalid machine id");
        }
        let result = await auth_verify(payload.auth_token)

        //console.log("data passed: " ,auth_token);
        //console.log("auth result from init connect: " , result);

        //Check Auth
        if (result.auth == false) {
            socket.disconnect();
        } else {
            register_device(result.localId, payload.machine_id, socket.id)
            callback({
                status: "message was acknowledged"
            })

            let auth_payload = {
                message: "Authentication was success"
            }
            payload_bus_stream(payload.machine_id, result.localId, auth_payload, "auth-result");
        }
    })

    socket.on('disconnect', function() {
        console.log("device on socket: " + socket.id + "has been disconnected");
        deregister_device_socket(socket.id)
    })
}
