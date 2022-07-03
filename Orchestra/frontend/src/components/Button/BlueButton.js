import React from 'react';
import './Button.css';
import { Button } from 'antd';

// Component for Blue Button
function BlueButton({ text, onButton }) {
    return (
        <div className="blue-button">
            <Button onClick={onButton}>
                {text}
            </Button>
        </div>
    );
}

export default BlueButton;