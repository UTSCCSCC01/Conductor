import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { sessionStorage_get } from '../../utils/store/store';
// Components
import Header from '../Header/Header';
import CalendarEvent from './section/CalendarEvent';
import ActiveJobs from './section/ActiveJobs';
// Style
import './CalendarPage.css';
import { Calendar } from 'antd';

// Job Sample Data
const jobData = [
    { name: "Chrome.exe on device Seron", date: moment().format("YYYY-MM-DD hh:mm:ss"), bots: [1, 2, 3] },
    { name: "CSCC01 Sprint 0", date: moment().format("YYYY-MM-DD hh:mm:ss"), bots: [1] },
    { name: "Turn Off Light", date: moment().format("YYYY-MM-DD hh:mm:ss"), bots: [1, 2] },
];

const userId = sessionStorage_get("auth") && JSON.stringify(sessionStorage_get("auth").localId);

function CalendarPage() {
    const [Value, setValue] = useState(moment());
    const [SelectedValue, setSelectedValue] = useState(moment());
    const [EventData, setEventData] = useState([]);

    useEffect(() => {
        if (!userId) {
            return;
        }
        axios.get("http://www.localhost:8080/api/eventbuilder/getUserEvents", { params: { userId: userId } })
            .then(response => {
                if (response.data.success) {
                    let eventBuilderData = response.data.eventBuilderData;
                    if (eventBuilderData.length > 0) {
                        eventBuilderData = eventBuilderData.filter(event => {
                            var date = new Date(event.executionDate);
                            return SelectedValue.format("YYYY-MM-DD") === date.toISOString().substring(0, 10);
                        });
                        console.log(eventBuilderData);
                    }
                    setEventData(eventBuilderData);
                } else {
                    console.log("Failed to load events.");
                }
            });
    }, [userId, SelectedValue]);

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
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