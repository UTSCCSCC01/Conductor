import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DevicePage.css';

function DeviceListPage() {
    const [DeviceData, setDeviceData] = useState([]);

    useEffect(() => {
        axios.get(`http://www.localhost:3007/api/devices/getAllDevices`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.devicesData);
                    setDeviceData(response.data.devicesData);
                }
            });
    }, []);

    return (
        <div className="device-list">
            Device List
        </div>
    );
}

export default DeviceListPage;