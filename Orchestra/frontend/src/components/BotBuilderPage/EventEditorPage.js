import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sessionStorage_get } from '../../utils/store/store';
// Components
import Applet from './section/Applet';
import AppletSelector from './section/AppletSelector';
import EventConfigs from './section/EventConfigs';
import EventInfo from './section/EventInfo';
import PlatformExecution from './section/PlatformExecution';
import Predicates from './section/Predicates';
// Style
import './BotBuilderPage.css';
import { AiFillSave } from 'react-icons/ai';

const userId = sessionStorage_get("auth") && JSON.stringify(sessionStorage_get("auth").localId);

function BotEditorPage() {
    const navigate = useNavigate();
    
    const [DisplayApplet, setDisplayApplet] = useState(false);
    const [AppletIndex, setAppletIndex] = useState(null);
    const [EventConfig, setEventConfig] = useState(null);
    const [Platform, setPlatform] = useState(null);
    const [ExecuteApplet, setExecuteApplet] = useState(null);
    const [ExecuteArg, setExecuteArg] = useState("");
    const [EventName, setEventName] = useState("");
    const [Description, setDescription] = useState("");
    const [ExecutionDate, setExecutionDate] = useState(null);
    const [Predicate, setPredicate] = useState([]);

    const onEventConfig = (config) => {
        setEventConfig(config);
    };

    const onPlatform = (deviceInfo) => {
        setPlatform(deviceInfo);
    };

    const onAppletSelector = (display, index) => {
        setDisplayApplet(display);
        setAppletIndex(index);
    };

    const onApplet = (applet, execArg) => {
        setExecuteApplet(applet);
        setExecuteArg(execArg);
    };

    const onEventName = (value) => {
        setEventName(value);
    };

    const onDescription = (value) => {
        setDescription(value);
    };

    const onExecutionDate = (date) => {
        setExecutionDate(date);
    };

    const onPredicate = (predecate) => {
        setPredicate(predecate);
    };
    
    const onSubmit = () => {
        if (EventConfig === null || !ExecuteApplet || !Platform || !ExecuteApplet || !EventName
            || !Description || !ExecutionDate || !Predicate
        ) {
            alert("Please fill in all attributes");
            return;
        }
        const deviceId = Platform ? Platform.deviceId : "";
        const appletType = ExecuteApplet && ExecuteApplet[0];
        const applet = ExecuteApplet && ExecuteApplet[2] ? ExecuteApplet[2].buid : null;
        const predicates = Predicate.find(p => { return p._id; });
        const variables = {
            eventConfig: EventConfig,
            deviceId: deviceId,
            appletType: appletType,
            applet: applet,
            appletArg: ExecuteArg,
            eventName: EventName,
            description: Description,
            executionDate: ExecutionDate,
            predicate: predicates,
            userId: JSON.stringify(sessionStorage_get("auth").localId),
            created: Date.now()
        };
        axios.post('http://www.localhost:3008/api/eventbuilder/addEvent', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.eventBuilderData);
                    alert("Successfully saved!");
                    navigate('/dashboard/builder');
                } else {
                    console.log("Failed to save event.");
                }
            });
    };

    if (DisplayApplet) {
        return (
            <div className="bot-events-container">
                <AppletSelector 
                    appletIndex={AppletIndex} 
                    deviceId={Platform && Platform.deviceId}
                    onAppletSelector={onAppletSelector} 
                    onSave={onApplet} 
                    style={{ display: !DisplayApplet ? "none" : "flex" }} 
                />
            </div>
        );
    }

    return (
        <div className="bot-events-container">
            <div className="bot-events page-title">
                <h2>Create New Event</h2>
            </div>
            <div className="bot-events-body">
                <div className="events-column">
                    <EventConfigs eventConfig={EventConfig} onSave={onEventConfig} />
                    <PlatformExecution selectedDevice={Platform} onSave={onPlatform} />
                </div>
                <div className="events-column">
                    <Applet 
                        deviceId={Platform && Platform.deviceId}
                        addedApplet={ExecuteApplet && ExecuteApplet[0]}
                        onAppletSelector={onAppletSelector}
                    />
                    <EventInfo 
                        eventName={EventName}
                        description={Description}
                        eventDate={ExecutionDate}
                        onSaveName={onEventName} 
                        onSaveDescription={onDescription} 
                        onSaveDate={onExecutionDate}
                    />
                </div>
                <div className="events-column">
                    <Predicates addedPredecates={Predicate} onSave={onPredicate} />
                    <div onClick={onSubmit} className="save-event">
                        <AiFillSave />
                        <div><h2>Save your event</h2></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BotEditorPage;