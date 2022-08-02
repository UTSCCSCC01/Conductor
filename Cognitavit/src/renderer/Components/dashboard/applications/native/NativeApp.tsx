import { Context, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './NativeApp.css'

import { useNavigate } from "react-router-dom";


import logo from './resource/Playstore.png'
import refresh from './resource/Refresh.png'
import SearchNativeApp from './search/SearchNativeApp';
import { sync_application_list } from 'renderer/utils/appSync/AppSync';


const NativeApp = () => {

    let refresh_app_list = () =>{
        let result = sync_application_list();
        toast.promise(result,{
            pending: "Syncing Application list with server.",
            error: "Syncing Failed",
            success: "Syncing Success"
        })
    };
    
    return (
        <div className="homepage-container">
            <div className="application-header-type-box">
                <div className="application-header-name">
                    <img src={logo} width="75px" alt="Orchestra Logo" />
                    <h1>Application Names</h1>
                </div>

                <div onClick={refresh_app_list} className="application-header-name-sync">
                    <img src={refresh} width="25px" alt="Orchestra Logo" />
                    <h2>Synchronize with servers</h2>
                </div>

            </div>

            <SearchNativeApp type="native"/>


        </div>
    )
};

export default NativeApp;

