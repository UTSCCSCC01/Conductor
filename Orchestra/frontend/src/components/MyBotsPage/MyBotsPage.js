import React from 'react';
// Components
import InstalledBots from './section/InstalledBots';
import BotUpdates from './section/BotUpdates';
// Style
import './MyBotsPage.css';

function MyBotsPage() {
    return (
        <div className="mybots-container">
            <InstalledBots />
            <BotUpdates />
        </div>
    );
}

export default MyBotsPage;