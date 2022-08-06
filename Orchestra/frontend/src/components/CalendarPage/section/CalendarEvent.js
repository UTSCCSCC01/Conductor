import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import SmallHeader from '../../Header/SmallHeader';
import BlueButton from '../../Button/BlueButton';
import ModalButton from '../../Button/ModalButton';
// Style
import '../CalendarPage.css';
import { Button, DatePicker, Input, Modal, Select } from 'antd';

const { Option } = Select;

function CalendarEvent({ selectedDate, bodyData }) {
    const navigate = useNavigate();

    const [DisplayModal, setDisplayModal] = useState(false);
    const [EventName, setEventName] = useState("");
    const [EventNameError, setEventNameError] = useState(false);
    const [Description, setDescription] = useState("");
    const [EventDate, setEventDate] = useState(null);

    const onView = (eventName) => {
        if (!eventName) return;
        navigate(`/dashboard/calendar/events/${eventName.replace(/\s+/g, '-').toLowerCase()}`);
    };

    const eventList = bodyData 
        ? bodyData.map((event, index) => {
            return (
                <div key={index} className="date-event">
                    <div className="event-description">
                        <h4>{event.name ? event.name : "Undefined"}</h4>
                        <p>{event.date ? event.date.format("hh:mm:ss") : "No time"}</p>
                    </div>
                    <BlueButton text="View" onButton={() => onView(event.name)} />
                </div>
            );
        })
        : <div className="date-event none">No Event</div>;

    // Modal to Add Event
    const onModal = () => {
        setDisplayModal(!DisplayModal);
    };

    const resetModal = () => {
        setEventName("");
        setEventNameError(false);
        setDescription("");
        setEventDate(null);
        setDisplayModal(false);
    };

    const onEventName = (event) => {
        setEventName(event.target.value);
        setEventNameError(event.target.value === "");
    };

    const onEventDescription = (event) => {
        setDescription(event.target.value);
    };

    const onDate = (value, dateString) => {
        console.log(`Formatted Date: ${dateString}`);
    };

    const onSelectDate = (value) => {
        setEventDate(value);
    };

    // Function for Add Event Submit Button
    const addEvent = () => {
        if (EventNameError) {
            return;
        } else if (EventName === "") {
            setEventNameError(true);
            return;
        }
        const variables = {
            name: EventName,
            description: Description,
            date: EventDate
        };
        console.log(variables);
        alert("Successfully Added!");
        resetModal();
    };

    return (
        <div className="calendar-event">
            <Modal 
                title="Add a New Event" 
                visible={DisplayModal} 
                destroyOnClose={true}
                onOk={addEvent} 
                onCancel={onModal}
                footer={[
                    <Button key="back" onClick={onModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={addEvent}>
                        Submit
                    </Button>
                ]}
                className="event-modal"
            >
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
                    onChange={onEventDescription}
                    className="event-input"
                />
                <p>Date</p>
                <DatePicker 
                    showTime 
                    onChange={onDate}
                    onOk={onSelectDate}
                    style={{ width: "100%" }}
                    className="event-input" 
                />
            </Modal>
            <SmallHeader title={selectedDate} />
            <div className="date-events">{eventList}</div>
            <ModalButton text="Add a New Event" onButton={onModal} />
        </div>
    );
}

export default CalendarEvent;