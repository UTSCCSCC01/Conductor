import React from 'react';
import './NavBar.css';
import { BulbFilled, CalendarFilled, HddFilled, PieChartFilled, RobotFilled, SettingFilled, ShopFilled } from '@ant-design/icons';
import 'antd/dist/antd.min.css';

/**
 * The navigation bar navigates users to the desired page.
 * 
 * * If the user is **logged in**, then the user can use the sidebar to access the functionalities of Orchestra (e.g. calendar, marketplace).
 * 
 * * If the user is **not logged in**, then the user can only access the main page and information. The navigation bar will direct the user to log in or register.
 */
export default function NavBar() {
    return (
        <div className="orchestra navbar">
            <a className="navbar-logo">
                <img src='/logo1.png' />
            </a>
            <a className={window.location.pathname === '/home' ? "selected" : undefined}>
                <PieChartFilled />
                <p>Home</p>
            </a>
            <a className={window.location.pathname === '/calendar' ? "selected" : undefined}>
                <CalendarFilled />
                <p>Calendar</p>
            </a>
            <a className={window.location.pathname === '/mybots' ? "selected" : undefined}>
                <BulbFilled />
                <p>My Bots</p>
            </a>
            <a className={window.location.pathname === '/devices' ? "selected" : undefined}>
                <HddFilled />
                <p>Device Status</p>
            </a>
            <a className={window.location.pathname.includes('/marketplace') ? "selected" : undefined}>
                <ShopFilled />
                <p>Marketplace</p>
            </a>
            <a className={window.location.pathname === '/builder' ? "selected" : undefined}>
                <RobotFilled />
                <p>Bot Builder</p>
            </a>
            <a className={window.location.pathname === '/settings' ? "selected" : undefined}>
                <SettingFilled />
                <p>Settings</p>
            </a>
        </div>
    );
};