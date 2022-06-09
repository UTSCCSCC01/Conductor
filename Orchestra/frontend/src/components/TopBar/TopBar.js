import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
    const location = useLocation();

    const [Path, setPath] = useState("");

    useEffect(() => {
        if (location.pathname.includes('home')) {
            setPath(" / User Dashboard");
        } else if (location.pathname.includes('calendar')) {
            setPath(" / Calendar");
        } else if (location.pathname.includes('mybots')) {
            setPath(" / My Bots");
        } else if (location.pathname.includes('devices')) {
            setPath(" / Device Status");
        } else if (location.pathname.includes('marketplace')) {
            setPath(" / Marketplace");
        } else if (location.pathname.includes('builder')) {
            setPath(" / Bot Builder");
        } else if (location.pathname.includes('settings')) {
            setPath(" / Settings");
        } 
    }, []);

    return (
        <div className="topbar">
            <div className="path">
                Orchestra{Path}
            </div>
            <div className="user">
                <p>NAME</p>
                <div className="circle" />
            </div>
        </div>
    );
}

export default TopBar;