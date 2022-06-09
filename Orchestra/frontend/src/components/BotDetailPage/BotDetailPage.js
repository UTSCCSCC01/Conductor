import React from 'react';
import { useLocation } from 'react-router-dom';
// Components
import BlueButton from '../Button/BlueButton';
import CommentInput from '../Comment/CommentInput';
import Comment from '../Comment/Comment';
import Header from '../Header/Header';
import PurpleButton from '../Button/PurpleButton';
import Section from './Section';
// Style
import './BotDetailPage.css';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';
import { LeftOutlined, StarFilled } from '@ant-design/icons';

const descripton = "Opens a user specified executable located on the host machine";
const developer = "Duck";
const device = [1, 0, 0, 1];
const reviewList = ["Comment 1", "Comment 2"];

// Page that shows detail of the bot
function BotDetailPage() {
    const location = useLocation();

    const onViewBot = () => {};
    const onInstall = () => {};
    const onSourceCode = () => {};

    const reviews = reviewList.map ((review, index) => {
        return (
            <div key={index} className="comment-block">
                <div className="rating">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                </div>
                <Comment comment={review} />
            </div>
        );
    });

    return (
        <div className="bot-detail">
            <Header 
                lButtonText={<div><LeftOutlined /> Back to Search</div>}
                title="Executor Bot" 
                date="created: 2022-05-25 | last modified: 2022-05-26" 
            />
            <div className="container">
                <div className="content">
                    <Section name="Description">
                        <div>{descripton}</div>
                    </Section>
                </div>
                <div className="content">
                    <Section name="Creator">
                        <div className="creator">
                            <img className="profile-img" src='/logo2.png' />
                            <div className="profile">
                                <h3>{developer}</h3>
                                <BlueButton text="View Other Bots" onButton={onViewBot} />
                            </div>
                        </div>
                    </Section>
                    <Section name="Supported Devices">
                        <div className="supported-devices">
                            <div className="devices">
                                <DiAndroid className={device[0] ? "icon-selected" : undefined} />
                                <DiApple className={device[1] ? "icon-selected" : undefined} />
                                <DiLinux className={device[2] ? "icon-selected" : undefined} />
                                <DiWindows className={device[3] ? "icon-selected" : undefined} />
                            </div>
                            <div className="devices-button">
                                <BlueButton text="Install" onButton={onInstall} />
                                <BlueButton text="Source Code" onButton={onSourceCode} />
                            </div>
                        </div>
                    </Section>
                </div>
                <div className="content">
                    <Section name="Reviews & Ratings" button={<PurpleButton path={`${location.pathname}/reviews`} text="View All" />}>
                        <div className="review">
                            <CommentInput />
                            <div className="comments">
                                {reviews}
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default BotDetailPage;