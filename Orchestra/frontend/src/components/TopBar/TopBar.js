import React from 'react';
import './TopBar.css';

function TopBar() {
    return (
        <div className="topbar">
            <div className="path">
                Orchestra
            </div>
            <div className="user">
                <p>NAME</p>
                <div className="circle" />
            </div>
        </div>
    );
}

export default TopBar;