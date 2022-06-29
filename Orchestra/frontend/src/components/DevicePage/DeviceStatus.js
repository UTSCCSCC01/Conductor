import React from 'react';
// Component
import SmallHeader from '../Header/SmallHeader';
import DeviceTable from './section/DeviceTable';
// Style
import './DevicePage.css';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';

const deviceRunningHeaderList = [
    {
        length: 2,
        header: "Name",
    },
    {
        length: 1,
        header: "Bots Running",
    },
    {
        length: 0,
        header: "Platform",
    },
    {
        length: 0,
        header: "Status",
    },
];

const deviceRunningList = [
    { 
        name: "Seron's Device",
        bot: "None",
        platform: [true, true, true, true],
        status: true,
    },
    { 
        name: "Alan",
        bot: "Chromebot",
        platform: [false, false, false, true],
        status: true,
    },
    { 
        name: "Win 10 Device",
        bot: "bot01, bot02",
        platform: [true, true, true, true],
        status: true,
    },
];

function DeviceStatus() {
    // Device Running Table Header
    const deviceRunningHeader = <div className="table-header">
        <div className="row large"><h3>Name</h3></div>
        <div className="row large"><h3>Bots Running</h3></div>
        <div className="row medium"><h3>Platform</h3></div>
        <div className="row small"><h3>Status</h3></div>
    </div>;
    
    // Device Running Table Body
    const deviceRunningBody = () => {
        // Devices
        const device = (platform) => {
            return <div>
                {platform[0] && <DiAndroid className="device-platform" />}
                {platform[1] && <DiApple className="device-platform" />}
                {platform[2] && <DiLinux className="device-platform" />}
                {platform[3] && <DiWindows className="device-platform" />}
            </div>
        };

        const rows = deviceRunningList.map((row, index) => {
            return (
                <div key={index} className="table-body-row">
                    <div className="row large"><p>{row.name}</p></div>
                    <div className="row large"><p>{row.bot}</p></div>
                    <div className="row medium"><div>{device(row.platform)}</div></div>
                    <div className="row small">
                        <p>{row.status ? "Active" : "Inactive"}</p>
                    </div>
                </div>
            );
        });
        
        return (
            <div className="table-body">{rows}</div>
        );
    };

    const addDevice = () => {
        console.log("Add Device");
    };

    return (
        <div className="device-container">
            <div className="device-status">
                <SmallHeader title="Device Running" buttonName1="View Devices" buttonName2="Add a Device" onButton={addDevice} />
                <DeviceTable tableHeader={deviceRunningHeader} tableBody={deviceRunningBody()} />
            </div>
            <div className="device-status">
                <SmallHeader title="Error" />
            </div>
            <div className="device-status">
                <SmallHeader title="Warning" />
            </div>
        </div>
    );
}

export default DeviceStatus;