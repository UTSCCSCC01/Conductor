import React from 'react';
// Style
import './Button.css';
import { Button } from 'antd';
import { AiFillEye, AiFillDelete } from 'react-icons/ai';

function IconButton({ text, onButton, isDelete }) {
    if (isDelete) {
        return (
            <div className="icon-button delete">
                <Button onClick={onButton}>
                    {text ? text : <AiFillDelete />}
                </Button>
            </div>
        );
    } else {
        return (
            <div className="icon-button">
                <Button onClick={onButton}>
                    {text ? text : <AiFillEye />}
                </Button>
            </div>
        );
    }
}

export default IconButton;