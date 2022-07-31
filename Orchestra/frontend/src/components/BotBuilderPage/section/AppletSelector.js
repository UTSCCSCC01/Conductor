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

const webBots = [
    {
        buid: "1",
        name: "Executor Bot",
        description: "Opens a user specified executable located on the host machine.",
        platform: "win32",
        version: "4.5",
        device: []
    }, {
        buid: "2",
        name: "Phone Bot",
        description: "Dials a specific number at a specific time.",
        platform: "android",
        version: "0.14",
        device: []
    }, {
        buid: "3",
        name: "Executor Bot",
        description: "Opens a user specified executable located on the host machine.",
        platform: "linux",
        version: "0.01",
        device: []
    }, {
        buid: "4",
        name: "Computer Bot",
        description: "Example",
        platform: "linux",
        version: "0.13",
        device: []
    }
];

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
                return applet.name.toLowerCase().includes(SearchText.toLowerCase());
            }));
            return;
        }
        setAddedApplet(addedApplet);
        setGivenApplets(webBots);
        setFilteredApplets(webBots);
        // Load Orchestra Web Bot
        // axios.post("http://www.localhost:8080/api/devices/getOneDevice", {
        //     userId: JSON.stringify(sessionStorage_get("auth").localId),
        //     deviceId: deviceId
        // })
        //     .then(response => {
        //         if (response.data.success && response.data.result) {
        //             if (appletIndex === 0) {
        //                 setGivenApplets(response.data.result.bots);
        //                 setFilteredApplets(response.data.result.bots);
        //             } else if (appletIndex === 1) {
        //                 setGivenApplets(response.data.result.application_list);
        //                 setFilteredApplets(response.data.result.application_list);
        //             } else if (appletIndex === 2) {
        //                 setGivenApplets(response.data.result.custombinaries);
        //                 setFilteredApplets(response.data.result.custombinaries);
        //             } else {
        //                 console.log("Invalid applet index");
        //             }
        //         } else {
        //             console.log("Failed to get applet");
        //         }
        //     });
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
                        <p>{row.name}</p>
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
            <h2>{(SelectedApplet !== null && FilteredApplets[SelectedApplet[1]].name) 
                || (AddedApplet && AddedApplet[2].name)}</h2>
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