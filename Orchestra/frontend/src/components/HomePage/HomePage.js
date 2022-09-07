import React from 'react';
import './HomePage.css';

import {sessionStorage_get, sessionStorage_save} from '../../utils/store/store'
import { Navigate, useNavigate } from 'react-router-dom';

function HomePage() {
    return (
        <div className="home">
            <p>I am the homepage</p>
            <p>Example</p>
            <p>Always get the auth token and attach it to your request to the backend</p>
            <p>The below is an authtoken. You can access it using sessionStorage_get. or sesionStaoge_save</p>
            <p>This can be accessed in any components</p>
            <p>Do not share information between components.</p>
            <p>{JSON.stringify(sessionStorage_get("auth"))}</p>
        </div>
    );
}

export default HomePage;