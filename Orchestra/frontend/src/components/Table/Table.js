import React from 'react';
import './Table.css';
import { AiFillExclamationCircle } from 'react-icons/ai';

function Table({ tableHeader, tableBody, isEmpty, emptyText }) {
    // If no devices
    if (isEmpty) {
        return (
            <div className="device-table empty">
                <AiFillExclamationCircle /> {emptyText}
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