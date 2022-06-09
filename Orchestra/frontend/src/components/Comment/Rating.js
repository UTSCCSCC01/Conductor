import React, { useState } from 'react';
import './Comment.css';
import { StarFilled } from '@ant-design/icons';

// Component for Rating (Star)
function Rating(props) {
    const [Star, setStar] = useState(0);

    const onRating = (num) => {
        setStar(num);
        props.onRating(num);
    };

    return (
        <div className="rating">
            <StarFilled className={Star > 0 ? "star-selected" : undefined} onClick={() => onRating(1)} />
            <StarFilled className={Star > 1 ? "star-selected" : undefined} onClick={() => onRating(2)} />
            <StarFilled className={Star > 2 ? "star-selected" : undefined} onClick={() => onRating(3)} />
            <StarFilled className={Star > 3 ? "star-selected" : undefined} onClick={() => onRating(4)} />
            <StarFilled className={Star > 4 ? "star-selected" : undefined} onClick={() => onRating(5)} />
        </div>
    );
}

export default Rating;