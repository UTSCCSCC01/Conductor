import React from 'react';
import './NavBar.css';
import logo from './assets/logo.png'

import { BulbFilled, CalendarFilled, HddFilled, PieChartFilled, RobotFilled, SettingFilled, ShopFilled } from '@ant-design/icons';

function NavBarTwo() {
    return (
        <div className="navbar">
            <a href='/dashboard/home' className="navbar-logo">
                <img src={logo} />
            </a>
            <a href='/dashboard/home' className={window.location.pathname === '/home' ? "selected" : undefined}>
                <PieChartFilled />
                <p>Home</p>
            </a>
            <a href='/dashboard/calendar' className={window.location.pathname === '/calendar' ? "selected" : undefined}>
                <CalendarFilled />
                <p>Calendar</p>
            </a>
            <a href='/dashboard/mybots' className={window.location.pathname === '/mybots' ? "selected" : undefined}>
                <BulbFilled />
                <p>My Bots</p>
            </a>
            <a href='/dashboard/devices' className={window.location.pathname === '/devices' ? "selected" : undefined}>
                <HddFilled />
                <p>Device Status</p>
            </a>
            <a href='/dashboard/marketplace' className={window.location.pathname === '/marketplace' ? "selected" : undefined}>
                <ShopFilled />
                <p>Marketplace</p>
            </a>
            <a href='/dashboard/upload' className={window.location.pathname === '/upload' ? "selected" : undefined}>
                <ShopFilled />
                <p>Upload</p>
            </a>
            <a href='/dashboard/builder' className={window.location.pathname === '/builder' ? "selected" : undefined}>
                <RobotFilled />
                <p>Bot Builder</p>
            </a>
            <a href='/dashboard/settings' className={window.location.pathname === '/settings' ? "selected" : undefined}>
                <SettingFilled />
                <p>Settings</p>
            </a>
            <a href='/logout'>
                <SettingFilled />
                <p>Logout</p>
            </a>
        </div>
    );
}

export default NavBarTwo;