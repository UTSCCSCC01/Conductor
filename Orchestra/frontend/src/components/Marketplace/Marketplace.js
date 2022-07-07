import React, { useEffect, useState } from 'react';
import './Marketplace.css';
import { Input, Table } from 'antd';

const { Search } = Input;
const axios = require('axios');

function Marketplace() {
    const [botarray, setBotArray] = useState([]);
    const [searchterm, setSearchTerm] = useState("");
    useEffect(() => {
        axios.get(`http://www.localhost:3006/marketplace/`)
            .then(res => {
                console.log(res.data);
                setBotArray(res.data);
                //setBotArray(res.data.botarray.slice(0,3));
            });
    }, [])
    const rows = botarray.filter((val) => {
        if (searchterm == "") {
            return val
        }
        else if (val.name.toLowerCase().includes(searchterm.toLowerCase())) {
            return val;
        }
    }).map((row, index) => {
        return (
            <div key={index} className="table-body-row">
                <div className="row large"><a href={"http://localhost:3000/marketplace/" + row.name}><p>{row.name}</p></a></div>
                <div className="row small"></div>
            </div>
        );
    })

    const header = () => {
        return (
            < div className="header" >
                <div>Name</div>
                <div>Description</div>
            </div >
        );
    };

    const body = () => {
        return (
            <div className="body">
                <div>Name1</div>
                <div>Description</div>
            </div>
        );
    };



    return (
        <div className="marketplace">
            Marketplace
            {/* {<div className="search">
                SearchBar
            </div>} */}
            <Search
                placeholder="Search bots" onChange={event => { setSearchTerm(event.target.value) }}
            />
            <div className="table">
                {header}
                {body}
                <div className="table-body">{rows}</div>
            </div>
        </div>
    );
}

export default Marketplace;