import React from 'react';
import './Table.css';
import { AiFillExclamationCircle } from 'react-icons/ai';

function Table({ tableHeader, tableBody, isEmpty }) {
    // If no devices
    if (isEmpty) {
        return (
            <div className="device-table empty">
                <AiFillExclamationCircle /> No Devices
            </div>
        );
    } else {
        return (
            <div className="table">
                {tableHeader}
                {tableBody}
            </div>
        );
    }
}

export default Table;