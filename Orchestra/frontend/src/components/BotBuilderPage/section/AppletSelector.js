import React, { useEffect, useState } from 'react';
import { sessionStorage_get } from '../../../utils/store/store';
import axios from 'axios';
// Components
import StatusButton from '../../Button/StatusButton';
// Style
import '../BotBuilderPage.css';
import { Input } from 'antd';
import { FaRobot, FaSearch } from 'react-icons/fa';
import { IoMdAppstore } from 'react-icons/io';
import { VscFileBinary } from 'react-icons/vsc';
import { RiCodeBoxFill } from 'react-icons/ri';

const userId = sessionStorage_get("auth") && JSON.stringify(sessionStorage_get("auth").localId);


const selectorHeader = [
    { icon: <FaRobot />, appletName: "Orchestra Web Bot" }, 
    { icon: <IoMdAppstore />, appletName: "Native Application" }, 
    { icon: <VscFileBinary />, appletName: "Custom Binaries" }
]

function AppletSelector({ addedApplet, appletIndex, deviceId, onAppletSelector, onSave }) {
    const [GivenApplets, setGivenApplets] = useState([]);
    const [FilteredApplets, setFilteredApplets] = useState([]);
    const [SearchText, setSearchText] = useState("");
    const [SelectedApplet, setSelectedApplet] = useState(null);
    const [AddedApplet, setAddedApplet] = useState(null);
    const [ExecInput, setExecInput] = useState("");
    const [ExecutionArgument, setExecutionArgument] = useState("");

    useEffect(() => {
        if (GivenApplets !== [] && SearchText !== "") {
            setFilteredApplets(GivenApplets.filter(applet => { 
                return applet.toLowerCase().includes(SearchText.toLowerCase());
            }));
            return;
        }
        setAddedApplet(addedApplet);

        const fetchData = async (bots) => {
            let botName = [];
            await Promise.all(bots.predicate.map(botId => {
                axios.get(`http://www.localhost:3006/marketplace/${botId}`)
                    .then(response => {
                        botName.push(response.data.name);
                    });
            }));
            return botName;
        };

        // Load applets
        axios.post("http://www.localhost:8080/api/devices/getOneDevice", {
            userId: JSON.stringify(sessionStorage_get("auth").localId),
            deviceId: deviceId
        })
            .then(response => {
                if (response.data.success && response.data.result) {
                    if (appletIndex === 0) {
                        const bots = response.data.result.bots;
                        let botName = [];
                        if (bots && bots.length > 0) {
                            botName = fetchData(bots);
                        }
                        setGivenApplets(botName);
                        setFilteredApplets(botName);
                    } else if (appletIndex === 1) {
                        setGivenApplets(response.data.result.native_app);
                        setFilteredApplets(response.data.result.native_app);
                    } else if (appletIndex === 2) {
                        setGivenApplets(response.data.result.custom_app);
                        setFilteredApplets(response.data.result.custom_app);
                    } else {
                        console.log("Invalid applet index");
                    }
                } else {
                    console.log("Failed to load applet");
                }
            });
    }, [SearchText, addedApplet, appletIndex]);

    const onSearchText = (event) => {
        setSearchText(event.target.value);
    };

    const onSelectApplet = (index) => {
        setSelectedApplet([appletIndex, index]);
        setExecutionArgument("");
    };

    const onExecutionArg = (event) => {
        setExecInput(event.target.value);
    };

    const appletList = FilteredApplets 
        ? FilteredApplets.map((row, index) => {
            return (
                <div key={index} className="selector-block selector-applet">
                    <div className="selector-info">
                        <RiCodeBoxFill />
                        <p>{row}</p>
                    </div>
                    {SelectedApplet 
                        ? SelectedApplet[1] === index 
                            ? <div className="selected"><StatusButton text="Selected" onButton={() => onSelectApplet(index)} /></div>
                            : <StatusButton text="Select" onButton={() => onSelectApplet(index)} />
                        : (AddedApplet && AddedApplet[1] === index)
                            ? <div className="selected"><StatusButton text="Selected" onButton={() => onSelectApplet(index)} /></div>
                            : <StatusButton text="Select" onButton={() => onSelectApplet(index)} />
                    }
                </div>
            );
        })
        : <div></div>;

    const executionArg = <div className="selector-block exec-arg">
        <div className="arg-header">
            <RiCodeBoxFill />
            <h2>{(SelectedApplet !== null && FilteredApplets[SelectedApplet[1]]) 
                || (AddedApplet && AddedApplet[2])}</h2>
        </div>
        <div className="arg-text">
            <p>Execution Arguments (Optional)</p>
            <Input 
                placeholder="Execute with optional arguments"
                defaultValue={ExecutionArgument}
                onChange={onExecutionArg}
                className="arg-input"
            />
        </div>
    </div>;

    // Cancel applet
    const onCancelApplet = () => {
        onAppletSelector(false, null);
    };

    // Save applet
    const onSaveApplet = () => {
        onAppletSelector(false, null);
        setExecutionArgument(ExecInput);
        onSave([appletIndex, SelectedApplet[1], FilteredApplets[SelectedApplet[1]]], ExecInput);
    };

    return (
        <div className="applet-selector">
            <div className="selector-block selector-header">
                {selectorHeader[appletIndex].icon}
                <h2>{selectorHeader[appletIndex].appletName}</h2>
            </div>
            <div className="selector-block selector-search">
                <div className="search-icon"><FaSearch /></div>
                <Input placeholder="Application list" onChange={onSearchText} />
                {/* <Search placeholder="input search text" /> */}
            </div>
            <div className="selector-list">
                {appletList}
            </div>
            {((SelectedApplet && SelectedApplet[0] === appletIndex) || (AddedApplet && AddedApplet[0] === appletIndex)) && executionArg}
            <div className="selector-block selector-button">
                <div className="selector-cancel"><StatusButton text="Cancel" onButton={onCancelApplet} /></div>
                <StatusButton text="Select Applet" onButton={onSaveApplet} />
            </div>
        </div>
    );
}

export default AppletSelector;