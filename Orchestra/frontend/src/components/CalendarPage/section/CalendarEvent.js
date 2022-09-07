import React from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import SmallHeader from '../../Header/SmallHeader';
import BlueButton from '../../Button/BlueButton';
import ModalButton from '../../Button/ModalButton';
// Style
import '../CalendarPage.css';

function CalendarEvent({ selectedDate, bodyData }) {
    const navigate = useNavigate();

    const onView = (eventName) => {
        if (!eventName) return;
        navigate(`/dashboard/calendar/events/${eventName.replace(/\s+/g, '-').toLowerCase()}`);
    };

    const eventList = bodyData 
        ? bodyData.map((event, index) => {
            const convertDate = (executionDate) => {
                var date = new Date(executionDate);
                return date.toISOString().substring(11, 19);
            };
            return (
                <div key={index} className="date-event">
                    <div className="event-description">
                        <h4>{event.eventName ? event.eventName : "Undefined"}</h4>
                        <p>{event.executionDate ? convertDate(event.executionDate) : "No time"}</p>
                    </div>
                    <BlueButton text="View" onButton={() => onView(event.name)} />
                </div>
            );
        })
        : <div className="date-event none">No Event</div>;

    const onNewEvent = () => {
        navigate('/dashboard/builder');
    }

    return (
        <div className="calendar-event">
            <SmallHeader title={selectedDate} />
            <div className="date-events">{eventList}</div>
            <ModalButton text="Add a New Event" onButton={onNewEvent} />
        </div>
    );
}

export default CalendarEvent;