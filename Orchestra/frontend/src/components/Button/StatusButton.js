import React from 'react';
import './Button.css';
import { Button } from 'antd';

// Component for Status Button
function StatusButton({ text, onButton }) {
    return (
        <div className="status-button">
            <Button onClick={onButton}>
                {text}
            </Button>
        </div>
    );
}

export default StatusButton;