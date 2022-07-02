import React from 'react';
import './Button.css';
import { Button } from 'antd';

function ModalButton({ text, onButton }) {
    return (
        <div className="modal-button">
            <Button onClick={onButton}>
                {text}
            </Button>
        </div>
    );
}

export default ModalButton;