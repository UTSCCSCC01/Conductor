import React, { useState } from 'react';
// Components
import BlueButton from '../Button/BlueButton';
// Style
import './Comment.css';
import { Input, message } from 'antd';
import { StarFilled } from '@ant-design/icons';

// Component for Rating and Comment Input
function CommentInput() {
    const [Comment, setComment] = useState("");
    const [Star, setStar] = useState(0);

    const onRating = (rating) => {
        setStar(rating);
    };

    const onCommentInput = (event) => {
        setComment(event.target.value);
    };

    const onSubmit = () => {
        const key = 'updatable';
        message.loading({ content: 'Sending review...', key });
        console.log(`${Star} stars - ${Comment}`);
        setTimeout(() => {
            message.success({ content: 'Success!', key, duration: 3 });
            window.location.reload(false);
        }, 3000);
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
            <BlueButton text="Submit" onButton={onSubmit} />
        </div>
    );
}

export default CommentInput;