import React, { useEffect, useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
import Table from '../../Table/Table';
import StatusButton from '../../Button/StatusButton';
// Style
import '../BotBuilderPage.css';
import { Button } from 'antd';
import { MdComputer, MdPhoneAndroid } from 'react-icons/md';
import { BsQuestionSquareFill } from 'react-icons/bs';

// Sample device data
const devices = [
    {
        name: "Adratic",   
        description: "",
        status: false,
        created: Date.now(),
        userId: "user1",
        deviceId: "123456",
        platform: "win32"
    }, {
        name: "Home",   
        description: "",
        status: false,
        created: Date.now(),
        userId: "user1",
        deviceId: "9876543",
        platform: "darwin"
    }, {
        name: "Gaming PC",   
        description: "",
        status: false,
        created: Date.now(),
        userId: "user1",
        deviceId: "13579",
        platform: "win32"
    }, {
        name: "Work",   
        description: "",
        status: false,
        created: Date.now(),
        userId: "user1",
        deviceId: "2468",
        platform: "android"
    }
];

function PlatformExecution({ onSave }) {
    const [DeviceList, setDeviceList] = useState([]);
    const [SelectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {
        if (devices && devices.length > 0) {
            setDeviceList(devices);
        }
    }, [devices, onSave]);

    const deviceIcon = (platform) => {
        if (platform === "android") return <MdPhoneAndroid />;
        else if (platform === "darwin") return <MdComputer />;
        else if (platform === "linux") return <MdComputer />;
        else if (platform === "win32") return <MdComputer />;
        else return <BsQuestionSquareFill />;
    };

    const deviceName = (platform) => {
        if (platform === "android") return "Android";
        else if (platform === "darwin") return "MacOS";
        else if (platform === "linux") return "Linux";
        else if (platform === "win32") return "Windows 10";
        else return "";
    };

    // Platform Table Header
    const platformHeader = <div className="table-header">
        <div className="row large"><h3>Name</h3></div>
        <div className="row large"><h3>UUID</h3></div>
        <div className="row large"></div>
    </div>;

    // Installed Bots Table Body
    const platformBody = () => {
        const onSelect = (index) => {
            setSelectedDevice(DeviceList[index]);
            onSave(DeviceList[index]);
        };
        
        const rows = devices.map((row, index) => {
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

    return (
        <div className="bot-event-blocks">
            <SmallHeader title="Platform Execution" />
            <div className="platform-execution">
                {SelectedDevice
                    ? <div className="selected-device">
                        <div className="device-icon">{deviceIcon(SelectedDevice.platform)}</div>
                        <div className="device-info">
                            <p>{deviceName(SelectedDevice.platform)}</p>
                            <p>{SelectedDevice.name}</p>
                            <p>{SelectedDevice.deviceId}</p>
                        </div>
                    </div>
                    : <div className="no-device">No Device Selected</div>
                }
                <div className="search-device"><Button>Search for device</Button></div>
                <div className="user-device-list">
                    <Table 
                        tableHeader={platformHeader} 
                        tableBody={platformBody()}
                        isEmpty={devices.length === 0}
                        emptyText="No Devices"
                    />
                </div>
            </div>
        </div>
    );
}

export default PlatformExecution;