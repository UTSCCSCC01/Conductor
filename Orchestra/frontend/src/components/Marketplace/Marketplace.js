import React, { useEffect, useState } from 'react';
import BlueButton from '../Button/BlueButton';
import './Marketplace.css';
import { Input, Table } from 'antd';

const { Search } = Input;
const axios = require('axios');

function Marketplace() {
    const [botarray, setBotArray] = useState([]);
    const [page, setPage] = useState(0);
    const [searchterm, setSearchTerm] = useState("");
    
    useEffect(() => {
        if(searchterm == ""){
            axios.post('http://localhost:5008/get_bots', {page: page})
                .then(res => {
                    console.log(res.data);
                    setBotArray(res.data.results);
                });
        }else{
            axios.post('http://127.0.0.1:5008/search_bots', { searchterm: searchterm })
                .then(res => {
                    console.log(res.data);
                    setBotArray(res.data.results);
                });
        }
    }, [page, searchterm])

    const rows = botarray.map((row, index) => {
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

    const getPrev = (val) => {if(val>0){return val-1}else{return 0}};
    const getNext = (val) => {if(botarray == []){return val}else{return val + 1}};

    const onPrev = () => {if(page > 0){setPage(getPrev(page))}};
    const onNext = () => {if(botarray != []){setPage(getNext(page))}};

    return (
        <div className="marketplace">
            Marketplace
            <Search
                placeholder="Search bots" onChange={event => {setSearchTerm(event.target.value)}}
            />
            <div className="table">
                {header}
                {body}
                <div className="table-body">{rows}</div>
            </div>
            <BlueButton text="prev" onButton={onPrev}/>
            <p> page: {page}</p>
            <BlueButton text="next" onButton={onNext}/>
        </div>
    );
}

export default Marketplace;