import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { sessionStorage_get } from '../../utils/store/store';
// Components
import BlueButton from '../Button/BlueButton';
import Table from '../Table/Table';
import SmallHeader from '../Header/SmallHeader';
import StatusButton from '../Button/StatusButton';
// Style
import './BotDetailPage.css';
import { Button, Modal } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';
import { FiDownload } from 'react-icons/fi';
import { BiCodeAlt } from 'react-icons/bi';

const userId = sessionStorage_get("auth") && JSON.stringify(sessionStorage_get("auth").localId);

// Page that shows detail of the bot
function BotDetailPage() {
    const navigate = useNavigate();
    const { bot } = useParams();

    const [Description, setDescription] = useState("");
    const [Name, setName] = useState("");
    const [Platform, setPlatform] = useState("");
    const [Developer, setDeveloper] = useState("");
    const [SourcecodeUrl, setSourcecodeUrl] = useState("");
    const [Filename, setFilename] = useState("");
    const [Reviews, setReviews] = useState([]);
    // Download sourcecode
    const [DeviceList, setDeviceList] = useState([]);
    const [SelectedDevice, setSelectedDevice] = useState("");
    const [DisplayModal, setDisplayModal] = useState(false);

    useEffect(() => {
        if (bot) {
            axios.get(`http://127.0.0.1:5000/marketplace/${bot}`)
                .then(response => {
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setPlatform(response.data.platform);
                    setDeveloper(response.data.developer);
                    setSourcecodeUrl(response.data.url);
                    setFilename(response.data.og_filename);
                });
            axios.get(`http://127.0.0.1:5000/reviews/${bot}`)
                .then(response => {
                    console.log(response.data.results);
                    setReviews(response.data.results);
                });
        }
    }, [bot]);

    const onViewBot = () => {
        if (bot) {
            navigate(`/dashboard/marketplace/${bot}/comments`);
        }
    };

    const onInstall = () => {
        axios.get('http://www.localhost:8080/api/devices/getAllDevices', { params: { userId: userId } })
            .then(response => {
                if (response.data.success) {
                    setDeviceList(response.data.devicesData);
                    setDisplayModal(true);
                } else {
                    console.log("Failed to load devices");
                }
            });
    };

    const onSourceCode = () => { 
        window.open(SourcecodeUrl);
    };

    // Platform Table Header
    const deviceHeader = <div className="table-header">
        <div className="row large"><h3>Name</h3></div>
        <div className="row large"><h3>UUID</h3></div>
        <div className="row large"></div>
    </div>;

    // Installed Bots Table Body
    const deviceBody = () => {
        const onSelect = (index) => {
            setSelectedDevice(DeviceList[index].deviceId);
        };

        const rows = DeviceList.map((row, index) => {
            return (
                <div key={index} className="table-body-row">
                    <div className="row large"><p>{row.name}</p></div>
                    <div className="row large"><p>{row.deviceId}</p></div>
                    <div className="row large">
                        <StatusButton text="Select" onButton={() => onSelect(index)} />
                    </div>
                </div>
            );
        });
        
        return (
            <div className="table-body">{rows}</div>
        );
    };

    const onDownload = () => {
        const variables = {
            userId: userId,
            deviceId: SelectedDevice,
            buid: bot,
            url: SourcecodeUrl,
            og_filename: Filename
        };
        console.log(variables);
        axios.post('http://127.0.0.1:5000/api/marketplace/download', variables)
            .then(response => {
                console.log(response.data);
                setSelectedDevice("");
                setDisplayModal(false);
            });
    }

    const onCancelModal = () => {
        setDisplayModal(false);
    };

    const ratingStars = (rating) => {
        let stars = [];
        const ratingNum = parseInt(rating);
        if (ratingNum && ratingNum > 0 && ratingNum <= 5) {
            for (let i = 0; i < ratingNum; i++) {
                stars.push(<StarFilled key={i} />)
            }
        }
        return <div>{stars}</div>;
    };

    const comments = Reviews && Reviews.length > 0
        ? Reviews.map((comment, index) => {
            return (
                <div key={index} className="comment-block">
                    <div className="comment-user">
                        <div className="comment-left">
                            <p className="comment-username">{comment.username}</p>
                            <p className="comment-date">{comment.created}</p>
                        </div>
                        <div className="comment-rating">{ratingStars(comment.rating)}</div>
                    </div>
                    <p className="comment-body">{comment.comments}</p>
                </div>
            );
        }) : <div>No comments</div>;

    return (
        <div className="bot-detail-container">
            <Modal 
                title="Download Source Code" 
                visible={DisplayModal} 
                destroyOnClose={true}
                onOk={onDownload} 
                onCancel={onCancelModal}
                footer={[
                    <Button key="back" onClick={onCancelModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onDownload}>
                        Download
                    </Button>
                ]}
                className="bot-detail-modal"
            >
                <Table 
                    tableHeader={deviceHeader} 
                    tableBody={deviceBody()}
                    isEmpty={DeviceList.length === 0}
                    emptyText="No Devices"
                />
            </Modal>
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
                    <div className="bot-detail-blocks review">
                        <SmallHeader title="Reviews" buttonName1="Show All" />
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