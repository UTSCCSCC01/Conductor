import React, { useState } from 'react';
// Components
import EventConfigs from './section/EventConfigs';
import PlatformExecution from './section/PlatformExecution';
import Applet from './section/Applet';
import EventInfo from './section/EventInfo';
import Predicates from './section/Predicates';
// Style
import './BotBuilderPage.css';
import { AiFillSave } from 'react-icons/ai';

function BotEditorPage() {
    const [EventConfig, setEventConfig] = useState(null);
    const [Platform, setPlatform] = useState(null);
    const [ExecuteApplet, setExecuteApplet] = useState(null);
    const [EventName, setEventName] = useState("");
    const [Description, setDescription] = useState("");
    const [ExecutionDate, setExecutionDate] = useState(null);
    const [Predicate, setPredicate] = useState(null);

    const onEventConfig = (config) => {
        setEventConfig(config);
    };

    const onPlatform = (deviceInfo) => {
        setPlatform(deviceInfo);
    };

    const onApplet = (applet) => {
        setExecuteApplet(applet);
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
        const variables = {
            eventConfig: EventConfig,
            platform: Platform,
            executeApplet: ExecuteApplet,
            eventName: EventName,
            description: Description,
            executionDate: ExecutionDate,
            predicate: Predicate
        };
        console.log(variables);
    };

    return (
        <div className="bot-events-container">
            <div className="bot-events page-title">
                <h2>Create New Event</h2>
            </div>
            <div className="bot-events-body">
                <div className="events-column">
                    <EventConfigs onSave={onEventConfig} />
                    <PlatformExecution onSave={onPlatform} />
                </div>
                <div className="events-column">
                    <Applet onSave={onApplet} />
                    <EventInfo 
                        onSaveName={onEventName} 
                        onSaveDescription={onDescription} 
                        onSaveDate={onExecutionDate}
                    />
                </div>
                <div className="events-column">
                    <Predicates onSave={onPredicate} />
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