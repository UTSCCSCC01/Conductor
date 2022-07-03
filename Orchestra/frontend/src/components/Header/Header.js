import React from 'react';
import PurpleButton from '../Button/PurpleButton';
import './Header.css';

// Component for Header
function Header({ lButtonText, rButtonText, title, date, path }) {
    return (
        <div className="page-header">
            <div className="header-button">
                <PurpleButton path={path} text={lButtonText} />
                <PurpleButton path={path} text={rButtonText} />
            </div>
            <div className="header-title">
                <h1>{title}</h1>
                {date && <p className="date">{date}</p>}
            </div>
        </div>
    );
}

export default Header;