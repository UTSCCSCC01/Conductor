import React from 'react';
import './BotDetailPage.css';

export default function Section(props) {
    return (
        <div className="section">
            <div className="section-header">
                <h2>{props.name}</h2>
                {props.button && <div className="section-header-button">{props.button}</div>}
            </div>
            <div className="section-body">
                {props.children}
            </div>
        </div>
    );
};