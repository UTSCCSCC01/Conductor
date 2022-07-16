import React from 'react';
import './Comment.css';

// Component of Comment Box
function Comment({ comment }) {
    return (
        <div className="comment">
            {comment}
        </div>
    );
}

export default Comment;