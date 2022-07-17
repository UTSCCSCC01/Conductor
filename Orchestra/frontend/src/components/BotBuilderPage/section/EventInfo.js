import React, { useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
// Style
import '../BotBuilderPage.css';
import { DatePicker, Input } from 'antd';

function EventInfo({ onSaveName, onSaveDescription, onSaveDate }) {
    const [EventName, setEventName] = useState("");
    const [EventNameError, setEventNameError] = useState("");
    const [Description, setDescription] = useState("");
    const [EventDate, setEventDate] = useState(null);

    const onEventName = (event) => {
        setEventName(event.target.value);
        setEventNameError(event.target.value === "");
        onSaveName(event.target.value);
    };

    const onDescription = (event) => {
        setDescription(event.target.value);
        onSaveDescription(event.target.value);
    };

    const onDate = (value, dateString) => {
        console.log(`Formatted Date: ${dateString}`);
    };

    const onSelectDate = (value) => {
        setEventDate(value);
        onSaveDate(value);
    };

    return (
        <div className="bot-event-blocks">
            <SmallHeader title="Event Information" />
            <div className="event-info">
                <p>Event Name</p>
                <Input 
                    placeholder="Event Name"
                    onChange={onEventName}
                    status={EventNameError && "error"}
                    className="event-input"
                />
                <p>Description</p>
                <Input 
                    placeholder="Description"
                    onChange={onDescription}
                    className="event-input"
                />
                <p>Date of Execution</p>
                <DatePicker 
                    showTime 
                    onChange={onDate}
                    onOk={onSelectDate}
                    style={{ width: "100%" }}
                    className="event-input" 
                />
            </div>
        </div>
    );
}

export default EventInfo;