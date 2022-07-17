import React, { useEffect, useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
import Table from '../../Table/Table';
import StatusButton from '../../Button/StatusButton';
// Style
import '../BotBuilderPage.css';
import { Typography } from 'antd';

const { Text } = Typography;

// Sample Data
const botsData = [
    {
        buid: "1",
        name: "ChromeOpen",
        description: "Opens chrome",
        platform: "win32",
        version: "4.5",
        device: ["Seron's Device"]
    }, {
        buid: "2",
        name: "XyBot",
        description: "Opens discord at a specific time",
        platform: "android",
        version: "0.14",
        device: []
    }, {
        buid: "3",
        name: "Bot-2",
        description: "Turns light off",
        platform: "darwin",
        version: "0.01",
        device: ["Mac"]
    }
];

function BotEvents() {
    const [BotsData, setBotsData] = useState([]);

    useEffect(() => {
        // Installed bots show at most 5 bots
        setBotsData(botsData.slice(0, 5));
    }, [botsData]);

    // Bot Events Table Header
    const botEventsHeader = <div className="table-header">
        <div className="row medium"><h3>Name</h3></div>
        <div className="row medium"><h3>Description</h3></div>
        <div className="row medium"><h3>Device</h3></div>
        <div className="row small"><h3>Edit</h3></div>
    </div>;

    // Installed Bots Table Body
    const botEventsBody = () => {
        const rows = BotsData.map((row, index) => {
            const onEdit = () => {
                console.log("Update bot");
            };

            return (
                <div key={index} className="table-body-row">
                    <div className="row medium"><p>{row.name}</p></div>
                    <div className="row medium">
                        <Text style={{ width: "95%" }} ellipsis={{ tooltip: "" }}>{row.description || "N/A"}</Text>
                    </div>
                    <div className="row medium">{row.device && row.device.length > 0 ? row.device : "No device"}</div>
                    <div className="row small"><StatusButton text="Edit" onButton={onEdit} /></div>
                </div>
            );
        });
        
        return (
            <div className="table-body">{rows}</div>
        );
    };
    
    return (
        <div className="bot-events">
            <SmallHeader title="Events" />
            <div className="bot-events-table">
                <Table 
                    tableHeader={botEventsHeader} 
                    tableBody={botEventsBody()} 
                    isEmpty={BotsData.length === 0} 
                    emptyText="No Bots"
                />
            </div>
        </div>
    );
}

export default BotEvents;