import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// Components
import BlueButton from '../Button/BlueButton';
import Header from '../Header/Header';
import PurpleButton from '../Button/PurpleButton';
import Section from './Section';
// Style
import './BotDetailPage.css';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';
import { LeftOutlined, StarFilled } from '@ant-design/icons';

const axios = require('axios');
const device = [1, 0, 0, 1];
const reviewList = ["Comment 1", "Comment 2"];



// Page that shows detail of the bot
function BotDetailPage() {
    const location = useLocation();
    const { bot } = useParams();

    const [Description, setDescription] = useState("");
    const [Filename, setFilename] = useState("");
    const [URL, setURL] = useState("");
    const [Developer, setDeveloper] = useState("");
    const [Name, setName] = useState("");
    const [Sourcecode, setSourcecode] = useState("");
    const onViewBot = () => { };
    const onInstall = () => {
        const download_url = "http://www.localhost:8000/download_and_install";
        let payload = {name: Name, url: URL, filename: Filename, buid: bot};
        axios.post(download_url, payload);
    };
    const onSourceCode = () => { window.open(Sourcecode) };

    useEffect(() => {
        if (bot) {
            axios.get(`http://www.localhost:5000/marketplace/${bot}`)
                .then(response => {
                    console.log(response);
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setDeveloper(response.data.developer);
                    setURL(response.data.url);
                    setFilename(response.data.og_filename);
                });
        }
    }, [bot]);

    return (
        <div className="bot-detail">
            <Header
                lButtonText={<div><LeftOutlined /> Back to Search</div>}
                title={Name}
                date="created: 2022-05-25 | last modified: 2022-05-26"
            />
            <div className="container">
                <div className="content">
                    <Section name="Description">
                        {/* <div>{getbotdescription(bot)}</div> */}
                        <div>{Description}</div>
                    </Section>
                </div>

                <div className="content">
                    <Section name="Creator">
                        <div className="creator">
                            <img className="profile-img" src='/logo2.png' />
                            <div className="profile">
                                <h3>{Developer}</h3>
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
            </div>
        </div>
    );
};

export default BotDetailPage;