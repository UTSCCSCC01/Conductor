import React, { useEffect, useState } from 'react';
import { sessionStorage_get } from '../../../utils/store/store';
import axios from 'axios';
// Components
import SmallHeader from '../../Header/SmallHeader';
import Table from '../../Table/Table';
// Style
import '../DevicePage.css';
import { Button, Input, Modal, Select } from 'antd';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';

const { Option } = Select;

const userId = sessionStorage_get("auth") && JSON.stringify(sessionStorage_get("auth").localId);

const platforms = [
    <Option key={"android"}>Android</Option>,
    <Option key={"darwin"}>iOS</Option>,
    <Option key={"linux"}>Linux</Option>,
    <Option key={"win32"}>Windows</Option>
];

function DeviceRunning() {
    const [DeviceData, setDeviceData] = useState([]);
    const [DisplayModal, setDisplayModal] = useState(false);
    // Add Device
    const [DeviceId, setDeviceId] = useState("");
    const [DeviceIdError, setDeviceIdError] = useState(false);
    const [DeviceName, setDeviceName] = useState("");
    const [DeviceNameError, setDeviceNameError] = useState(false);
    const [Description, setDescription] = useState("");
    const [DevicePlatform, setDevicePlatform] = useState("android");

    useEffect(() => {
        axios.get(`http://www.localhost:8080/api/devices/getAllDevices`, { params: { userId: userId } })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.devicesData);
                    setDeviceData(response.data.devicesData.slice(0, 3));
                }
            });
    }, []);

    // Device Running Table Header
    const deviceRunningHeader = <div className="table-header">
        <div className="row large"><h3>Name</h3></div>
        <div className="row large"><h3>Bots Running</h3></div>
        <div className="row medium"><h3>Platform</h3></div>
        <div className="row small"><h3>Status</h3></div>
    </div>;

    // Device Running Table Body
    const deviceRunningBody = () => {
        // Bots
        const bots = (bot) => {
            if (!bot || bot === []) {
                return <p>No bots</p>;
            } else {
                return <p>{bot}</p>;
            }
        }

        // Devices
        const selectPlatform = (platform) => {
            if (platform === "android") return <DiAndroid className="device-platform" />;
            else if (platform === "darwin") return <DiApple className="device-platform" />;
            else if (platform === "linux") return <DiLinux className="device-platform" />;
            else if (platform === "win32") return <DiWindows className="device-platform" />;
            else return <div>N/A</div>
        };

        const rows = DeviceData.map((row, index) => {
            console.log(row);

            return (
                <div key={index} className="table-body-row">
                    <div className="row large"><p>{row.name}</p></div>
                    <div className="row large">{bots(row.bot)}</div>
                    <div className="row medium"><div>{selectPlatform(row.platform)}</div></div>
                    <div className="row small">
                        <p>{row.status ? "Active" : "Inactive"}</p>
                    </div>
                </div>
            );
        });
        
        return (
            <div className="table-body">{rows}</div>
        );
    };

    // Modal to Add Device
    const onModal = () => {
        setDisplayModal(!DisplayModal);
    };

    const onDeviceId = (event) => {
        setDeviceId(event.target.value);
        setDeviceIdError(event.target.value === "");
    };

    const onDeviceName = (event) => {
        console.log(event.target.value);
        setDeviceName(event.target.value);
        setDeviceNameError(event.target.value === "");
    };

    const onDeviceDescription = (event) => {
        setDescription(event.target.value);
    };

    const onDevicePlatform = (value) => {
        setDevicePlatform(value);
    };

    // Function for Add Device Submit Button
    const addDevice = () => {
        if (DeviceNameError) {
            return;
        }
        console.log("Add Device");
        const variables = { 
            bots: [],
            created: Date.now(),
            deviceId: DeviceId,
            description: Description,
            platform: DevicePlatform,
            name: DeviceName,
            status: true,
            userId: userId,
        };
        axios.post(`http://www.localhost:8080/api/devices/addDevice`, variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.deviceData);
                    alert("Successfully Added!");
                    window.location.reload();
                }
            });
    };

    return (
        <div className="device-status">
            <Modal 
                title="Add a New Device" 
                visible={DisplayModal} 
                onOk={addDevice} 
                onCancel={onModal}
                footer={[
                    <Button key="back" onClick={onModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={addDevice}>
                        Submit
                    </Button>
                ]}
                className="device-modal"
            >
                <p>Device Id</p>
                <Input 
                    placeholder="Device ID"
                    onChange={onDeviceId}
                    status={DeviceIdError && "error"}
                    className="device-input"
                />
                <p>Device Name</p>
                <Input 
                    placeholder="Device Name"
                    onChange={onDeviceName}
                    status={DeviceNameError && "error"}
                    className="device-input"
                />
                <p>Description</p>
                <Input 
                    placeholder="Description"
                    onChange={onDeviceDescription}
                    className="device-input"
                />
                <p>Platform</p>
                <Select
                    allowClear
                    showArrow
                    style={{ width: '100%' }}
                    placeholder="Select Platform(s)"
                    onChange={onDevicePlatform}
                    className="device-input"
                >
                    {platforms}
                </Select>
            </Modal>
            <SmallHeader 
                title="Device Running" 
                buttonName1="View Devices" 
                buttonName2="Add a Device" 
                onButton={onModal}
                path='/dashboard/devices/list'
            />
            <Table 
                tableHeader={deviceRunningHeader} 
                tableBody={deviceRunningBody()} 
                isEmpty={DeviceData.length === 0} 
                emptyText="No Devices"
            />
        </div>
    );
}

export default DeviceRunning;