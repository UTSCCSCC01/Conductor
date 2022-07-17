import React from 'react';
import { useNavigate } from 'react-router-dom'; 
// Components
import SmallHeader from '../Header/SmallHeader';
import BotEvents from './section/BotEvents';
import StatusButton from '../Button/StatusButton';
// Style
import './BotBuilderPage.css';

function BotEventsPage() {
    const navigate = useNavigate();

    const onRedirect = () => {
        navigate('/dashboard/builder/editor');
    };

    return (
        <div className="bot-events-container">
            <BotEvents />
            <div className="bot-events">
                <StatusButton text="Create New Event" onButton={onRedirect} />
            </div>
        </div>
    );
}

export default BotEventsPage;