import React, { useEffect, useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
import Table from '../../Table/Table';
import StatusButton from '../../Button/StatusButton';
// Style
import '../MyBotsPage.css';

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

// Sample Data
const botsVersion = [
    { buid: "1", version: "4.6" },
    { buid: "2", version: "1.3" },
    { buid: "3", version: "2.14" }
];

function BotUpdates() {
    const [BotsData, setBotsData] = useState([]);

    useEffect(() => {
        // Update bots show at most 5 bots
        setBotsData(botsData.slice(0, 5));
    }, [botsData]);

    // Bot Updates Table Header
    const installedBotsHeader = <div className="table-header">
        <div className="row medium"><h3>Name</h3></div>
        <div className="row medium"><h3>Current Version</h3></div>
        <div className="row medium"><h3>New Version</h3></div>
        <div className="row small"><h3>Status</h3></div>
    </div>;

    // Bot Updates Table Body
    const installedBotsBody = () => {
        const rows = BotsData.map((row, index) => {
            const getNewVersion = () => {
                if (!row.buid) return;
                const newVersion = botsVersion.filter(b => { return b.buid === row.buid });
                if (newVersion && newVersion.length > 0) {
                    return <p>{newVersion[0].version}</p>
                } else {
                    return <p>N/A</p>
                }
            };

            const onUpdate = () => {
                console.log("Update bot");
            };

            return (
                <div key={index} className="table-body-row">
                    <div className="row medium"><p>{row.name}</p></div>
                    <div className="row medium"><p>{row.version}</p></div>
                    <div className="row medium">{getNewVersion()}</div>
                    <div className="row small"><StatusButton text="Update" onButton={onUpdate} /></div>
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
                title="Bot Updates" 
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

export default BotUpdates;