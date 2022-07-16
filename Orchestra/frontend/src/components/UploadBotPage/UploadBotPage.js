import React, { useState } from 'react';
// Components
import BlueButton from '../Button/BlueButton';
import Header from '../Header/Header';
import UploadFile from './UploadFile';
// Style
import './UploadBotPage.css';
import { Input, Select } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const platforms = [
    <Option key={"android"}>Android</Option>,
    <Option key={"darwin"}>iOS</Option>,
    <Option key={"linux"}>Linux</Option>,
    <Option key={"win32"}>Windows</Option>
];

function UploadBotPage() {
    const [BotName, setBotName] = useState("");
    const [BotNameError, setBotNameError] = useState(false);
    const [BotDescription, setBotDescription] = useState("");
    const [BotDescriptionError, setBotDescriptionError] = useState(false);
    const [Platform, setPlatform] = useState([]);
    const [PlatformError, setPlatformError] = useState(false);

    const onBotName = (event) => {
        setBotName(event.target.value);
        setBotNameError(event.target.value === "");
    };

    const onBotDescription = (event) => {
        setBotDescription(event.target.value);
        setBotDescriptionError(event.target.value === "");
    };

    const onPlatform = (value) => {
        setPlatform(value);
        setPlatformError(value === []);
    };

    const onSubmit = () => {
        // this is where you submit to backend
        if (BotNameError || BotDescriptionError || PlatformError ||
            BotName === "" || BotDescription === "" || Platform === []) {
            alert("Upload Failed: Fill out all fields");
            return;
        }
        const variable = {
            name: BotName,
            description: BotDescription,
            platforms: Platform,
        };

        console.log(variable);
    }

    return (
        <div className="upload-bot">
            <Header
                lButtonText={<div><LeftOutlined /> Back to Marketplace</div>}
                title="Upload a New Bot"
                path='/dashboard/marketplace'
            />
            <p>All fields are required. Select at least 1 platform.</p>
            <p>If you wish to update an existing Bot to a new version,
               use the "Update" page.
            </p>
            <div className="upload-form">
                <p>Bot Name</p>
                <Input 
                    placeholder="Bot Name"
                    onChange={onBotName}
                    status={BotNameError && "error"}
                    className="upload-bot-input"
                />
                <p>Bot Description</p>
                <TextArea 
                    placeholder="Bot Description"
                    onChange={onBotDescription}
                    className="upload-bot-input"
                />
                <p>Supported Platforms</p>
                <Select
                    mode="multiple"
                    allowClear
                    showArrow
                    style={{ width: '100%' }}
                    placeholder="Select Platform(s)"
                    onChange={onPlatform}
                    className="upload-bot-input"
                >
                    {platforms}
                </Select>
                <p>Bot Files</p>
                <UploadFile/>
            </div>
            <BlueButton text="Publish Bot" onButton={onSubmit} />
        </div>
    );
}

export default UploadBotPage;