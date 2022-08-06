import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sessionStorage_get } from '../../../utils/store/store';
// Components
import SmallHeader from '../../Header/SmallHeader';
import Table from '../../Table/Table';
import StatusButton from '../../Button/StatusButton';
// Style
import '../BotBuilderPage.css';
import { Typography } from 'antd';

const { Text } = Typography;

const userId = sessionStorage_get("auth") && JSON.stringify(sessionStorage_get("auth").localId);

function BotEvents() {
    const [BotsData, setBotsData] = useState([]);
    const [Update, setUpdate] = useState(false);

    useEffect(() => {
        axios.get("http://www.localhost:8080/api/eventbuilder/getUserEvents", { params: { userId: userId } })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.eventBuilderData);
                    setBotsData(response.data.eventBuilderData);
                } else {
                    console.log("Failed to load events.");
                }
            });
    }, [Update]);

    // Bot Events Table Header
    const botEventsHeader = <div className="table-header">
        <div className="row medium"><h3>Name</h3></div>
        <div className="row medium"><h3>Description</h3></div>
        <div className="row medium"><h3>Device UUID</h3></div>
        <div className="row small"></div>
    </div>;

    const onDelete = async (index) => {
        console.log(BotsData[index]);
        // Delete predicates
        if (BotsData[index].predicate && BotsData[index].predicate.length > 0) {
            console.log("HERE");
            console.log(BotsData[index].predicate);
            await Promise.all(BotsData[index].predicate.map(predicateId => {
                console.log(predicateId);
                axios.delete(`http://www.localhost:3014/api/predicates/deletePredicate/${predicateId}`)
                    .then(response => {
                        if (response.data.success) {
                            console.log(response.data.doc);
                        } else {
                            console.log("Failed to delete predicate");
                        }
                    });
            }));
        }
        // Delete event
        axios.delete(`http://www.localhost:8080/api/eventbuilder/deleteUserEvent/${BotsData[index]._id}`)
            .then(response => {
                if (response.data.success) {
                    alert("Successfully deleted event!");
                    console.log(response.data.eventBuilderData);
                    setUpdate(!Update);
                } else {
                    alert("Failed to delete event");
                }
            });
    };

    // Installed Bots Table Body
    const botEventsBody = () => {
        const rows = BotsData.map((row, index) => {
            return (
                <div key={index} className="table-body-row">
                    <div className="row medium"><p>{row.eventName}</p></div>
                    <div className="row medium">
                        <Text style={{ width: "95%" }} ellipsis={{ tooltip: "" }}>{row.description || "N/A"}</Text>
                    </div>
                    <div className="row medium">{row.deviceId && row.deviceId.length > 0 ? row.deviceId : "No device"}</div>
                    <div className="row small"><StatusButton text="Delete" onButton={() => onDelete(index)} /></div>
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
                    emptyText="No Events"
                />
            </div>
        </div>
    );
}

export default BotEvents;