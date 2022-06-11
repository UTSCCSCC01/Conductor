import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { Button } from 'antd';

/**
 * Button components work as input functions or paths.
 * 
 * * **Blue Button** is usually used to install bots or submit comments.
 * 
 * * **Purple Button** is used for page navigation (e.g. move to detailed page or previous page.)
 */
export default function BlueButton({ text, onButton }) {
    return (
        <div className="blue-button">
            <Button onClick={onButton}>
                {text}
            </Button>
        </div>
    );
};

BlueButton.propTypes = {
    /**
     * Text on the button.
     */
    text: PropTypes.string,
    /**
     * Function that executes when user clicks the button.
     */
     onButton: PropTypes.func,
};

BlueButton.defaultProps = {
    text: 'Submit',
    onButton: undefined,
};