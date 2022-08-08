import React, { useEffect, useState } from 'react';
import { sessionStorage_get } from '../../utils/store/store';
import axios from 'axios';
// Components
import Table from '../Table/Table';
import Header from '../Header/Header';
import ModalButton from '../Button/ModalButton';
import IconButton from '../Button/IconButton';
// Style
import './DevicePage.css';
import { Button, Input, Modal, Select } from 'antd';
import { DiAndroid, DiApple, DiLinux, DiWindows } from 'react-icons/di';
import { LeftOutlined } from '@ant-design/icons';

const { Option } = Select;

const userId = sessionStorage_get("auth") && JSON.stringify(sessionStorage_get("auth").localId);

const platforms = [
    <Option key={"android"}>Android</Option>,
    <Option key={"darwin"}>iOS</Option>,
    <Option key={"linux"}>Linux</Option>,
    <Option key={"win32"}>Windows</Option>
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
    const [DevicePlatform, setDevicePlatform] = useState("android");

    useEffect(() => {
        axios.get(`http://www.localhost:8080/api/devices/getAllDevices`, { params: { userId: userId } })
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
        const selectPlatform = (platform) => {
            if (platform === "android") return <DiAndroid className="device-platform" />;
            else if (platform === "darwin") return <DiApple className="device-platform" />;
            else if (platform === "linux") return <DiLinux className="device-platform" />;
            else if (platform === "win32") return <DiWindows className="device-platform" />;
            else return <div>N/A</div>
        };

        const rows = DeviceData.map((row, index) => {
            return (
                <div key={index} className="table-body-row">
                    <div className="row large"><p>{row.name}</p></div>
                    <div className="row large">{bots(row.bot)}</div>
                    <div className="row small">{selectPlatform(row.platform)}</div>
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
        axios.delete('http://www.localhost:8080/api/devices/deleteOneDevice', { params: deleteInfo })
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
            user: userId,
        };
        axios.post(`http://www.localhost:8080/api/devices/addDevice`, variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.deviceData);
                    alert("Successfully Added!");
                    window.location.reload(); //Future: Use reace usestate/useeffect to dynamically update screen instead of refreshing.
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
                    path='/dashboard/devices'
                />
                <Table 
                    tableHeader={deviceRunningHeader} 
                    tableBody={deviceRunningBody()} 
                    isEmpty={DeviceData.length === 0} 
                    emptyText="No Devices"
                />
            </div>
            <ModalButton text="Add a Device" onButton={onAddModal} />
        </div>
    );
}

export default DeviceListPage;