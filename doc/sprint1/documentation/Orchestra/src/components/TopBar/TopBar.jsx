import React, { useState } from 'react';
import './TopBar.css';

/**
 * TopBar appears when the user is logged in.
 * 
 * Used to show path of the current page and user information (user profile, username).
 * 
 * * TopBar recognizes the path using `useLocation().pathname`
 * 
 * > The path can't be viewed in this documentation, since `<Router>` isn't used in documentation
 */
export default function TopBar() {
    const [Path, setPath] = useState("");

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
};