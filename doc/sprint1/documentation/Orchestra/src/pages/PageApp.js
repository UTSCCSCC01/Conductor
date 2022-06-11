import React from 'react';
import NavBarOne from '../components/NavBar/NavBarOne';
import NavBarTwo from '../components/NavBar/NavBarTwo';
import TopBar from '../components/TopBar/TopBar';
import './PageApp.css';

export default function PageApp({ login, page }) {
    return (
        <div>
            {!login 
                ? <div><NavBarOne /></div> 
                : <div className="sidebar"><NavBarTwo /></div>
            }
            {login && <div className="top"><TopBar /></div>}
            <div className={!login ? "page-pre" : "page"}>
                {page}
            </div>
        </div>
    );
};