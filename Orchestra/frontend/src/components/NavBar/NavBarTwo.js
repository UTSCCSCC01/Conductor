import React from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import logo from './assets/logo.png'

import { BulbFilled, CalendarFilled, HddFilled, LogoutOutlined, PieChartFilled, RobotFilled, SettingFilled, ShopFilled } from '@ant-design/icons';

function NavBarTwo() {
    const location = useLocation();

    return (
        <div className="navbar">
            <a href='/dashboard/home' className="navbar-logo">
                <img src={logo} />
            </a>
            <a href='/dashboard/home' className={location.pathname === '/dashboard/home' ? "selected" : undefined}>
                <PieChartFilled />
                <p>Home</p>
            </a>
            <a href='/dashboard/calendar' className={location.pathname === '/dashboard/calendar' ? "selected" : undefined}>
                <CalendarFilled />
                <p>Calendar</p>
            </a>
            <a href='/dashboard/mybots' className={location.pathname === '/dashboard/mybots' ? "selected" : undefined}>
                <BulbFilled />
                <p>My Bots</p>
            </a>
            <a href='/dashboard/devices' className={location.pathname === '/dashboard/devices' ? "selected" : undefined}>
                <HddFilled />
                <p>Device Status</p>
            </a>
            <a href='/dashboard/marketplace' className={location.pathname === '/dashboard/marketplace' ? "selected" : undefined}>
                <ShopFilled />
                <p>Marketplace</p>
            </a>
            <a href='/dashboard/builder' className={location.pathname === '/dashboard/builder' ? "selected" : undefined}>
                <RobotFilled />
                <p>Bot Builder</p>
            </a>
            <a href='/dashboard/settings' className={location.pathname === '/dashboard/settings' ? "selected" : undefined}>
                <SettingFilled />
                <p>Settings</p>
            </a>
            <a href='/logout'>
                <LogoutOutlined />
                <p>Logout</p>
            </a>
        </div>
    );
}

export default NavBarTwo;