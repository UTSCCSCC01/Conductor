import React, { useEffect, useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
import Table from '../../Table/Table';
// Style
import '../MyBotsPage.css';
import { Typography } from 'antd';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';

const { Text } = Typography;

// Sample Data
const botsData = [
    {
        buid: "1",
        name: "Executor Bot",
        description: "Opens a user specified executable located on the host machine.",
        platform: "win32",
        version: "4.5",
        device: []
    }, {
        buid: "2",
        name: "Phone Bot",
        description: "Dials a specific number at a specific time.",
        platform: "android",
        version: "0.14",
        device: []
    }, {
        buid: "3",
        name: "Executor Bot",
        description: "Opens a user specified executable located on the host machine.",
        platform: "linux",
        version: "0.01",
        device: []
    }
];

function InstalledBots() {
    const [BotsData, setBotsData] = useState([]);

    useEffect(() => {
        // Bot events show at most 5 bots
        setBotsData(botsData.slice(0, 5));
    }, [botsData]);

    // Bot Events Table Header
    const installedBotsHeader = <div className="table-header">
        <div className="row medium"><h3>Name</h3></div>
        <div className="row large"><h3>Description</h3></div>
        <div className="row small"><h3>Platform</h3></div>
        <div className="row medium"><h3>Currently Installed</h3></div>
    </div>;

    // Installed Bots Table Body
    const installedBotsBody = () => {
        // Installed Devices
        const devices = (device) => {
            if (!device || device.length === 0) return <p>No devices</p>;
            else return <p>{device}</p>;
        };

        // Devices
        const selectPlatform = (platform) => {
            if (platform === "android") return <DiAndroid className="device-platform" />;
            else if (platform === "darwin") return <DiApple className="device-platform" />;
            else if (platform === "linux") return <DiLinux className="device-platform" />;
            else if (platform === "win32") return <DiWindows className="device-platform" />;
            else return <div>N/A</div>
        };

        const rows = BotsData.map((row, index) => {
            return (
                <div key={index} className="table-body-row">
                    <div className="row medium"><p>{row.name}</p></div>
                    <div className="row large">
                        <Text style={{ width: "95%" }} ellipsis={{ tooltip: "" }}>{row.description || "N/A"}</Text>
                    </div>
                    <div className="row small">{selectPlatform(row.platform)}</div>
                    <div className="row medium">{devices(row.device)}</div>
                </div>
            );
        });
        
        return (
            <div className="table-body">{rows}</div>
        );
    };
    
    return (
        <div className="mybots-status">
            <SmallHeader 
                title="Installed Bots" 
                buttonName1="View Bots"
                path='/dashboard/mybots/list'
            />
            <Table 
                tableHeader={installedBotsHeader} 
                tableBody={installedBotsBody()} 
                isEmpty={BotsData.length === 0} 
                emptyText="No Bots"
            />
        </div>
    );
}

export default InstalledBots;