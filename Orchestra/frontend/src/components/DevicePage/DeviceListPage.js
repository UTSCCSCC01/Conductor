import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Components
import DeviceTable from './section/DeviceTable';
import Header from '../Header/Header';
import ModalButton from '../Button/ModalButton';
import IconButton from '../Button/IconButton';
// Style
import './DevicePage.css';
import { Button, Input, Modal, Select } from 'antd';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';
import { LeftOutlined, StarFilled } from '@ant-design/icons';

const { Option } = Select;

const userId = "user1";

const platforms = [
    <Option key={0}>Android</Option>,
    <Option key={1}>iOS</Option>,
    <Option key={2}>Linux</Option>,
    <Option key={3}>Windows</Option>
];

let deleteInfo = null;

function DeviceListPage() {
    const [DeviceData, setDeviceData] = useState([]);
    const [DisplayModal, setDisplayModal] = useState(false);
    const [DeleteModal, setDeleteModal] = useState(false);
    // Delete Device
    const [DeleteInfo, setDeleteInfo] = useState(null);
    // Add Device
    const [DeviceId, setDeviceId] = useState("");
    const [DeviceIdError, setDeviceIdError] = useState(false);
    const [DeviceName, setDeviceName] = useState("");
    const [DeviceNameError, setDeviceNameError] = useState(false);
    const [Description, setDescription] = useState("");
    const [DevicePlatform, setDevicePlatform] = useState([false, false, false, false]);

    useEffect(() => {
        axios.get(`http://www.localhost:3007/api/devices/getAllDevices`, { params: { userId: userId } })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.devicesData);
                    setDeviceData(response.data.devicesData);
                }
            });
    }, []);

    // Device Running Table Header
    const deviceRunningHeader = <div className="table-header">
        <div className="row large"><h3>Name</h3></div>
        <div className="row large"><h3>Bots Running</h3></div>
        <div className="row small"><h3>Platform</h3></div>
        <div className="row small"><h3>Status</h3></div>
        <div className="row small" />
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
        const device = (platform) => {
            return <div>
                {platform[0] && <DiAndroid className="device-platform" />}
                {platform[1] && <DiApple className="device-platform" />}
                {platform[2] && <DiLinux className="device-platform" />}
                {platform[3] && <DiWindows className="device-platform" />}
            </div>
        };

        const rows = DeviceData.map((row, index) => {
            return (
                <div key={index} className="table-body-row">
                    <div className="row large"><p>{row.name}</p></div>
                    <div className="row large">{bots(row.bot)}</div>
                    <div className="row small"><div>{device(row.platform)}</div></div>
                    <div className="row small">
                        <p>{row.status ? "Active" : "Inactive"}</p>
                    </div>
                    <div className="row small icon">
                        <IconButton />
                        <IconButton 
                            onButton={() =>onDeleteModal(row.deviceId, row.userId)} 
                            isDelete={true}
                        />
                    </div>
                </div>
            );
        });

        return (
            <div className="table-body">{rows}</div>
        );
    };

    // Modal to Delete Device
    const onDeleteModal = (deviceId, userId) => {
        deleteInfo = { deviceId: deviceId, userId: userId };
        setDeleteModal(!DeleteModal);
    }

    // Function for Delete Device Button
    const deleteDevice = () => {
        axios.delete('http://www.localhost:3007/api/devices/deleteOneDevice', { params: deleteInfo })
            .then(response => {
                if (response.data.success) {
                    alert("Successfully Deleted!");
                    window.location.reload();
                }
            });
        setDeleteModal(false);
    }

    // Modal to Add Device
    const onAddModal = () => {
        setDisplayModal(!DisplayModal);
    };

    const onDeviceId = (event) => {
        setDeviceId(event.target.value);
        setDeviceIdError(event.target.value === "");
    };

    const onDeviceName = (event) => {
        setDeviceName(event.target.value);
        setDeviceNameError(event.target.value === "");
    };

    const onDeviceDescription = (event) => {
        setDescription(event.target.value);
    };

    const onDevicePlatform = (value) => {
        let devicePlatform = [false, false, false, false];
        if (value.includes('0')) devicePlatform[0] = true;
        if (value.includes('1')) devicePlatform[1] = true;
        if (value.includes('2')) devicePlatform[2] = true;
        if (value.includes('3')) devicePlatform[3] = true;
        setDevicePlatform(devicePlatform);
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
            user: "user1",
        };
        axios.post(`http://www.localhost:3007/api/devices/addDevice`, variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.deviceData);
                    alert("Successfully Added!");
                    window.location.reload();
                }
            });
    };

    return (
        <div className="device-list">
            {/* Modal to delete a device */}
            <Modal 
                visible={DeleteModal} 
                onOk={deleteDevice} 
                onCancel={() => onDeleteModal(null, null)}
                footer={[
                    <Button key="back" onClick={() => onDeleteModal(null, null)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={deleteDevice}>
                        Delete
                    </Button>
                ]}
                className="device-modal delete"
            >
                <h2>Are you sure you want to delete this device?</h2> 
            </Modal>
            {/* Modal to add a device */}
            <Modal 
                title="Add a New Device" 
                visible={DisplayModal} 
                onOk={addDevice} 
                onCancel={onAddModal}
                footer={[
                    <Button key="back" onClick={onAddModal}>
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
                    mode="multiple"
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
            <div className="top">
                <Header
                    lButtonText={<div><LeftOutlined /> Back to Device Status</div>}
                    title="All Devices"
                    path='/devices'
                />
                <DeviceTable 
                    tableHeader={deviceRunningHeader} 
                    tableBody={deviceRunningBody()} 
                    isEmpty={DeviceData.length === 0} 
                />
            </div>
            <ModalButton text="Add a Device" onButton={onAddModal} />
        </div>
    );
}

export default DeviceListPage;