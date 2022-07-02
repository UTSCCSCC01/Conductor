import React from 'react';
// Components
import SmallHeader from '../Header/SmallHeader';
import DeviceRunning from './section/DeviceRunning';
// Style
import './DevicePage.css';

function DeviceStatusPage() {
    return (
        <div className="device-container">
            <DeviceRunning />
            <div className="device-status">
                <SmallHeader title="Error" />
            </div>
            <div className="device-status">
                <SmallHeader title="Warning" />
            </div>
        </div>
    );
}

export default DeviceStatusPage;