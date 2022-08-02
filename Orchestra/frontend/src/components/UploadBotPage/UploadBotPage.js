import React, { useState } from 'react';
// Components
import BlueButton from '../Button/BlueButton';
import Header from '../Header/Header';
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

const upload_url = "http://127.0.0.1:5000/upload";

function UploadBotPage() {
    const [selectedFiles, setSelectedFiles] = useState();
    const [progress, setProgress] = useState(0);
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

    const onUpload = ({target : {files}}) => {
        setSelectedFiles(files[0]);
    };

    const onSubmit = () => {
        // this is where you submit to backend
        if (BotNameError || BotDescriptionError || PlatformError ||
            BotName === "" || BotDescription === "" || Platform === []) {
            alert("Upload Failed: Fill out all fields");
            return;
        }
        
        let form = new FormData();
        form.append("name", BotName);
        form.append("description", BotDescription);
        form.append("platform", Platform);
        form.append("file", selectedFiles);

        for (var pair of form.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        axios.post(upload_url, form, {
            headers: {"Content-Type": "multipart/form-data"},
            onUploadProgress: data => {setProgress(Math.round((100 * data.loaded) / data.total))}
            }
        ).then(res => {console.log(res)})
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
                <input type="file" onChange={onUpload}/>
            </div>
            <BlueButton text="Publish Bot" onButton={onSubmit} />
        </div>
    );
}

export default UploadBotPage;