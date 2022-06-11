import React, { useState } from 'react';
// Style
import './Comment.css';
import { Input } from 'antd';
import { StarFilled } from '@ant-design/icons';

/**
 * The comment component takes the user's rating and comment text.
 * 
 * Comment text is not required - users can leave it empty.
 */
export default function CommentInput() {
    const [Comment, setComment] = useState("");
    const [Star, setStar] = useState(0);

    const onRating = (rating) => {
        setStar(rating);
    };

    const onCommentInput = (event) => {
        setComment(event.target.value);
    };

    return (
        <div className="comment-input">
            <div className="rating">
                <StarFilled className={Star > 0 ? "star-selected" : undefined} onClick={() => onRating(1)} />
                <StarFilled className={Star > 1 ? "star-selected" : undefined} onClick={() => onRating(2)} />
                <StarFilled className={Star > 2 ? "star-selected" : undefined} onClick={() => onRating(3)} />
                <StarFilled className={Star > 3 ? "star-selected" : undefined} onClick={() => onRating(4)} />
                <StarFilled className={Star > 4 ? "star-selected" : undefined} onClick={() => onRating(5)} />
            </div>
            <Input className="input" placeholder="Write a review" onChange={onCommentInput} />
        </div>
    );
};
