import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

/**
 * Comment component which displays comment text.
 * 
 * * If the comment is written by developer, theme color is `#530BF4`.
 * 
 * * Otherwise, theme color is `#000054`.
 */
export default function Comment({ comment, isDeveloper }) {
    return (
        <div className={`comment ${isDeveloper ? "developer" : ""}`}>
            {comment}
        </div>
    );
};

Comment.propTypes = {
    /**
     * Comment written by the user.
     */
    comment: PropTypes.string,
    /**
     * Checks whether the comment is written by the developer or not.
     */
    isDeveloper: PropTypes.bool,
};

Comment.defaultProps = {
    comment: 'Comment 1',
    isDeveloper: false,
};