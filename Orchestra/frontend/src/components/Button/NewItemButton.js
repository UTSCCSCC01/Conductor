import React from 'react';
import './Button.css';
import { Button } from 'antd';

function NewItemButton({ text, onButton }) {
    return (
        <div className="new-button">
            <Button onClick={onButton}>
                {text}
            </Button>
        </div>
    );
}

export default NewItemButton;