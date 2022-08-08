import React, { useState } from 'react';
import moment from 'moment';
// Components
import Header from '../Header/Header';
import CalendarEvent from './section/CalendarEvent';
import ActiveJobs from './section/ActiveJobs';
// Style
import './CalendarPage.css';
import { Calendar } from 'antd';

// Event Sample Data
const eventData = [
    { name: "Watch TV Program", date: moment().subtract(1, 'days') },
    { name: "Buy coke" },
    { name: "CSCC01 Sprint 3", date: moment() },
    { name: "Open calendar", date: moment() },
    { name: "Run YouTube", date: moment().subtract(1, 'days') },
];

// Job Sample Data
const jobData = [
    { name: "Chrome.exe on device Seron", date: moment().format("YYYY-MM-DD hh:mm:ss"), bots: [1, 2, 3] },
    { name: "CSCC01 Sprint 0", date: moment().format("YYYY-MM-DD hh:mm:ss"), bots: [1] },
    { name: "Turn Off Light", date: moment().format("YYYY-MM-DD hh:mm:ss"), bots: [1, 2] },
];

function CalendarPage() {
    const [Value, setValue] = useState(moment());
    const [SelectedValue, setSelectedValue] = useState(moment());
    const [EventData, setEventData] = useState(eventData.filter(event => {
        return event.date && event.date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
    }));

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
        // Filter data by date
        const data = eventData.filter(event => {
            return event.date && event.date.format("YYYY-MM-DD") === newValue.format("YYYY-MM-DD")
        });
        setEventData(data);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div className="calendar-page">
            <Header title="Calendar" />
            <div className="calendar-page-container">
                <div className="calendar-module">
                    <Calendar fullscreen={false} value={Value} onSelect={onSelect} onPanelChange={onPanelChange} />
                    <CalendarEvent selectedDate={SelectedValue.format('MMMM DD, YYYY')} bodyData={EventData} />
                </div>
                <ActiveJobs selectedDate={SelectedValue.format('MMMM DD, YYYY')} bodyData={jobData} />
            </div>
        </div>
    );
}

export default CalendarPage;