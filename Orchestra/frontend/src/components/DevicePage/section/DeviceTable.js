import React from 'react';
import '../DevicePage.css';
import { AiFillExclamationCircle } from 'react-icons/ai';

function DeviceTable({ tableHeader, tableBody, isEmpty }) {
    // If no devices
    if (isEmpty) {
        return (
            <div className="device-table empty">
                <AiFillExclamationCircle /> No Devices
            </div>
        );
    } else {
        return (
            <div className="device-table">
                {tableHeader}
                {tableBody}
            </div>
        );
    }
}

export default DeviceTable;