import React from 'react';
import './Marketplace.css';
import { Input, Table } from 'antd';

const { Search } = Input;

function Marketplace() {
    const header = () => {
        return (
            <div className="header">
                <div>Name</div>
                <div>Description</div>
            </div>
        );
    };

    const body = () => {
        return (
            <div className="body">
                <div>Name1</div>
                <div>Description1</div>
            </div>
        );
    };

    return (
        <div className="marketplace">
            Marketplace
            {/* <div className="search">
                SearchBar
            </div> */}
            <Search 
                placeholder="Search bots"
            />
            <div className="table">
                {header}
                {body}
            </div>

        </div>
    );
}

export default Marketplace;