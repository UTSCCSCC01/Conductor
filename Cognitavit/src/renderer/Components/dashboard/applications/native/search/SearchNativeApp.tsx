import { Context, useContext, useState, useId, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SearchNativeApp.css';

import { useNavigate } from 'react-router-dom';

import binary_file from './resource/Binaryfile.png';
import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const SearchNativeApp = (prop: any) => {

    const [input, setInput] = useState('');
    const [applicationList, setApplicationList] = useState([]);
    
    //Only set at run time.
    const [Apps, setApps] = useState([]);


    const [selectedApplication, setSelectedApplication] = useState('');
    const [applicationArgument, SetApplicationArgument] = useState('');

    const [executableType, setExectuableType] = useState('');

    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const filter_content = (event: any) => {
        const input_word = event.target.value;
        if (input_word == '') {
            setApplicationList(Apps);
            setInput(input_word);
            return;
        }
        const filtered_apps = Apps.filter((apps: string) =>
            apps.toLowerCase().includes(input_word.toLowerCase())
        );
        setApplicationList(filtered_apps.sort());
        setInput(input_word);
    };


    useEffect(() => {
        //FUTURE: 
        //Look at the prop.type value to determine if its custom_bin, or applets.

        let value = window.exec_calls.proc_bus(["getApplist", {}])
        toast.promise(value,{
            pending: "Reading Application List",
            error: "Unable to read from Application list, IPC BUS has not responded.",
            success: "Application List has been obtained.."
        })

        value.then((result:any) => {
            if(result != undefined && result["application_list"] != undefined){
                if(result["application_list"].length > 0){
                    setApps(result["application_list"].sort())
                    setApplicationList(result["application_list"].sort())
                }
            }
            console.log("INSIDE THE NATIVE_APP", result["application_list"]);
        })

        if(prop.type == 'native'){
            setExectuableType("Native App")
        }else if(prop.type == 'custom'){
            setExectuableType("Custom App")
        }else if(prop.type == 'webapp'){
            setExectuableType("Web App")
        }else{
            setExectuableType("Undefined")
        }
        

    }, [])


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 125,
        bgcolor: '#FFFFFF',
        border: '1px solid #DFE0EB',
        boxShadow: 24,
        p: 4,
    };

    const text_style = {
        marginTop: '10px',
        width: '375px',
    };

    const argument_read = (event: any) => {
        const input_word = event.target.value;
        SetApplicationArgument(input_word);
        console.log(input_word);
    }

    const execute_application = () => {
        let application_name = selectedApplication;
        let application_arguments = applicationArgument;
        
        /**
         * Future 
         * Add Injection
         * prop.type => change depending on the
         */

        // Send a message over our ipc bus manager
        let value = window.exec_calls.proc_bus(["executeApp", {
            application_name: application_name,
            arguments: application_arguments
        }])
        toast.promise(value,{
            pending: "Executing App",
            error: "Execution failed. [Trigger not responding/running]",
            success: "App will start soon."
        })

        console.log("Executing", application_name, application_arguments);
    }

    return (
        <div className="container">

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        sx={{ marginLeft: '12px' }}
                        variant="h6"
                        component="h4"
                    >
                        { "Execute " + executableType}
                    </Typography>
                    <div className="input-region-exec">
                        <TextField
                            sx={text_style}
                            size="small"
                            id="outlined-basic"
                            label="Application Arguments"
                            variant="outlined"
                            defaultValue={applicationArgument}
                            onChange={argument_read}
                        />
                        <div className="button-container-exec">
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleClose}
                            >
                                Exit
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    execute_application();
                                    handleClose();
                                }}
                            >
                                {' '}
                                Execute
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>

            <input
                className="search-box"
                type="search"
                value={input}
                onChange={filter_content}
                placeholder= {executableType + " List"} 
            />

            <div className="application-list">
                {applicationList && applicationList.length > 0 ? (
                    applicationList.map((appname: string) => (
                        <li key={'key.' + appname} className="app-item">
                            <img
                                className="binary_logo"
                                src={binary_file}
                                width="50px"
                                alt="Orchestra Logo"
                            />
                            <h2 className="application_name">{appname}</h2>
                            <button
                                className="execute"
                                onClick={() => {
                                    setSelectedApplication(appname)
                                    handleOpen();
                                }}
                            >
                                Execute
                            </button>
                        </li>
                    ))
                ) : (
                    <h1>{executableType} not found</h1>
                )}
            </div>
        </div>
    );
};

export default SearchNativeApp;
