import React from 'react';
import PropTypes from 'prop-types';
import PurpleButton from '../Button/PurpleButton';
import './Header.css';

// Component for Header
export default function Header({ lButtonText, rButtonText, title, date }) {
    return (
        <div className="page-header">
            <div className="header-button">
                <PurpleButton text={lButtonText} />
                <PurpleButton text={rButtonText} />
            </div>
            <div className="header-title">
                <h1>{title}</h1>
                {date && <p className="date">{date}</p>}
            </div>
        </div>
    );
};

Header.propTypes = {
    /**
     * Text of the button on left-handed side.
     */
    lButtonText: PropTypes.string,
    /**
     * Text of the button on right-handed side.
     */
    rButtonText: PropTypes.string,
    /**
     * Title of the page.
     */
    title: PropTypes.string,
    /**
     * Date when the detail was created (POST) and updated (PUT).
     */
    date: PropTypes.string,
};

Header.defaultProps = {
    lButtonText: "< Back to the list",
    rButtonText: "edit",
    date: "created: 2022-06-09 | last modified: 2022-06-10"
};