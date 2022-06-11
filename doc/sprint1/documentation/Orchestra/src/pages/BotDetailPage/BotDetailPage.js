import React from 'react';
import PageApp from '../PageApp';
// Components
import BlueButton from '../../components/Button/BlueButton';
import CommentInput from '../../components/Comment/CommentInput';
import Comment from '../../components/Comment/Comment';
import Header from '../../components/Header/Header.jsx';
import PurpleButton from '../../components/Button/PurpleButton';
import Section from './Section';
// Style
import './BotDetailPage.css';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';
import { LeftOutlined, StarFilled } from '@ant-design/icons';

const descripton = "Opens a user specified executable located on the host machine";
const developer = "Duck";
const device = [1, 0, 0, 1];
const reviewList = ["Comment 1", "Comment 2"];

/**
 * UI for **Bot Detail Page** of Orchestra. Only the users who logged in can access the page.
 * 
 * Bot Detail Page can be accessed from the first page of the marketplace.
 * 
 * In Bot Detail Page, users can view following information:
 * 
 * * Name of the Bot
 * 
 * * Date of the uploaded date + updated date
 * 
 * * Creator (developer) of the bot - Can move to the **Marketplace Page** where creator's bots are listed
 * 
 * * Supported devices - Users can install the bot or view the source code
 * 
 * * Reviews and ratings input box
 * 
 * * List of reviews and ratings from users - Can move to **Reviews and Ratings Page**
 */
export default function BotDetailPage() {
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
        <PageApp 
            login={true}
            page={
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
                            <Section name="Reviews & Ratings" button={<PurpleButton text="View All" />}>
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
            }
        />
    );
};