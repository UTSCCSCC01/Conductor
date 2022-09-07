import { Context, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CustomBin.css'

import { useNavigate } from "react-router-dom";


import logo from './resource/Playstore.png'
import refresh from './resource/Refresh.png'
import SearchCustomApp from './search/SearchCustomApp';


const CustomBin = () => {
    return (
        <div className="homepage-container">
 
            <div className="application-header-type-box">
                <div className="application-header-name">
                    <img src={logo} width="75px" alt="Orchestra Logo" />
                    <h1>Custom Binaries</h1>
                </div>

                <div className="application-header-name-sync">
                    <img src={refresh} width="25px" alt="Orchestra Logo" />
                    <h2>Synchronize with servers</h2>
                </div>

            </div>

            <SearchCustomApp type="custom" />


        </div>
    )
};

export default CustomBin;

