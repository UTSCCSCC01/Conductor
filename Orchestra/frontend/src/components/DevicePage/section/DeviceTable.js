import React from 'react';
import '../DevicePage.css';

function DeviceTable({ tableHeader, tableBody }) {
    return (
        <div className="device-table">
            {tableHeader}
            {tableBody}
        </div>
    );
}

export default DeviceTable;