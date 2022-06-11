import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * ## Purple Button
 * 
 * Button component that is colored in purple. Used for page navigation.
 * 
 * Examples:
 * 
 * * Back to <PAGE-NAME> (previous page)
 * 
 * * View more/all (detail page)
 */
export default function PurpleButton({ path, text }) {
    return (
        <a href={path} className="purple-button">
            {text}
        </a>
    );
}

PurpleButton.propTypes = {
    /**
     * Path of the page to navigate.
     */
    path: PropTypes.string,
    /**
     * Text on the button.
     */
    text: PropTypes.string,
};

PurpleButton.defaultProps = {
    path: undefined,
    text: 'Submit',
};