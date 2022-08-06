import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
// Components
import BlueButton from '../Button/BlueButton';
import SmallHeader from '../Header/SmallHeader';
// Style
import './BotDetailPage.css';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';
import { FiDownload } from 'react-icons/fi';
import { BiCodeAlt } from 'react-icons/bi';

const sampleComments = [
    { userId: "user1", text: "comment 1", created: moment() }, 
    { userId: "user1", text: "comment 2", created: moment().subtract(1, 'days') },
    { userId: "user2", text: "22345364758679878675641243254365476553423", created: moment().subtract(1, 'days') },
    { userId: "user1", text: "asdsfgdhfjgkhljkhjghetrweqwrthjgryetwrqefrgfd", created: moment().subtract(1, 'days') },
    { userId: "user3", text: "comment 5", created: moment().subtract(1, 'days') },
];

// Page that shows detail of the bot
function BotDetailPage() {
    const navigate = useNavigate();
    const { bot } = useParams();

    const [Description, setDescription] = useState("");
    const [Name, setName] = useState("");
    const [Platform, setPlatform] = useState("");
    const [Developer, setDeveloper] = useState("");
    const [Sourcecode, setSourcecode] = useState("");
    const [Comments, setComments] = useState([]);

    const onViewBot = () => {
        if (bot) {
            navigate(`/dashboard/marketplace/${bot}/comments`);
        }
    };

    const onInstall = () => { };

    const onSourceCode = () => { 
        window.open(Sourcecode);
    };

    useEffect(() => {
        setName("TEST_NAME");
        setDescription("TEST_DESCRIPTION TEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTIONTEST_DESCRIPTION");
        setSourcecode("TEST_SOURCE_CODE");
        setComments(sampleComments);

        if (bot) {
            axios.get(`http://www.localhost:3006/marketplace/${bot}`)
                .then(response => {
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setPlatform(response.data.platform);
                    setDeveloper(response.data.developer);
                    setSourcecode(response.data.url);
                    setComments(response.data.comments);
                });
        }
    }, [bot]);

    const comments = Comments && Comments.length > 0
        ? Comments.map((comment, index) => {
            return (
                <div key={index} className="comment-block">
                    <div className="comment-user">
                        <p className="comment-username">{comment.userId}</p>
                        <p className="comment-date">{comment.created.format("YYYY-MM-DD")}</p>
                    </div>
                    <p className="comment-body">{comment.text}</p>
                </div>
            );
        }) : undefined;

    return (
        <div className="bot-detail-container">
            <div className="bot-detail page-title">
                <h2>{Name}</h2>
            </div>
            <div className="bot-detail-body">
                <div className="detail-column">
                    <div className="bot-detail-blocks description">
                        <SmallHeader title="Description" />
                        <div className="description-container">
                            <p>{Description}</p>
                        </div>
                    </div> 
                    <div className="bot-detail-blocks">
                        <SmallHeader title="Author" />
                        <div className="creator">
                            <img className="profile-img" src='/logo1.png' />
                            <div className="profile">
                                <h3>{Developer}</h3>
                                <BlueButton text="View Other Bots" onButton={onViewBot} />
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="detail-column">
                    <div className="bot-detail-blocks">
                        <SmallHeader title="Device Supported" />
                        <div className="bot-device-list">
                            <div className={`bot-device ${Platform === "android" ? "selected" : ""}`}>
                                <DiAndroid />
                                <h3>Android</h3>
                            </div>
                            <div className={`bot-device ${Platform === "darwin" ? "selected" : ""}`}>
                                <DiApple />
                                <h3>Apple</h3>
                            </div>
                            <div className={`bot-device ${Platform === "linux" ? "selected" : ""}`}>
                                <DiLinux />
                                <h3>Linux</h3>
                            </div>
                            <div className={`bot-device ${Platform === "win32" ? "selected" : ""}`}>
                                <DiWindows />
                                <h3>Windows</h3>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="detail-column">
                    <div className="bot-device-list download">
                        <div className="bot-device save" onClick={onInstall}>
                            <FiDownload />
                            <div><h2>Source Code</h2></div>
                        </div>
                        <div className="bot-device source-code" onClick={onSourceCode}>
                            <BiCodeAlt />
                            <div><h2>Source Code</h2></div>
                        </div>
                    </div>
                    <div className="bot-detail-blocks">
                        <SmallHeader title="Comments" buttonName1="Show All" />
                        <div className="bot-device-list comment">
                            {comments}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotDetailPage;