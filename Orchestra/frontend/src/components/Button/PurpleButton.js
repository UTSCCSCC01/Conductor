import React from 'react';
import './Button.css';

function PurpleButton({ path, text }) {
    return (
        <a href={path} className="purple-button">
            {text}
        </a>
    );
}

export default PurpleButton;