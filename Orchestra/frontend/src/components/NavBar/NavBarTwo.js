import React from 'react';
import './NavBar.css';
import { BulbFilled, CalendarFilled, HddFilled, PieChartFilled, RobotFilled, SettingFilled, ShopFilled } from '@ant-design/icons';

function NavBarTwo() {
    return (
        <div className="navbar">
            <a href='/home' className="navbar-logo">
                <img src='logo1.png' />
            </a>
            <a href='/home' className={window.location.pathname === '/home' ? "selected" : undefined}>
                <PieChartFilled />
                <p>Home</p>
            </a>
            <a href='/calendar' className={window.location.pathname === '/calendar' ? "selected" : undefined}>
                <CalendarFilled />
                <p>Calendar</p>
            </a>
            <a href='/mybots' className={window.location.pathname === '/mybots' ? "selected" : undefined}>
                <BulbFilled />
                <p>My Bots</p>
            </a>
            <a href='/devices' className={window.location.pathname === '/devices' ? "selected" : undefined}>
                <HddFilled />
                <p>Device Status</p>
            </a>
            <a href='/marketplace' className={window.location.pathname === '/marketplace' ? "selected" : undefined}>
                <ShopFilled />
                <p>Marketplace</p>
            </a>
            <a href='/builder' className={window.location.pathname === '/builder' ? "selected" : undefined}>
                <RobotFilled />
                <p>Bot Builder</p>
            </a>
            <a href='/settings' className={window.location.pathname === '/settings' ? "selected" : undefined}>
                <SettingFilled />
                <p>Settings</p>
            </a>
        </div>
    );
}

export default NavBarTwo;