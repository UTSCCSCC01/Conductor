import React from 'react';
import BlueButton from '../Button/BlueButton';
import NewItemButton from '../Button/NewItemButton';
import './Header.css';

// Component for Header
function SmallHeader({ title, buttonName1, buttonName2, onButton, path }) {
    return (
        <div className="page-header small">
            <h2>{title}</h2>
            <div className="header-buttons">
                <BlueButton text={buttonName1} />
                {buttonName2 && onButton && <NewItemButton text={buttonName2} onButton={onButton} />}
            </div>
        </div>
    );
}

export default SmallHeader;