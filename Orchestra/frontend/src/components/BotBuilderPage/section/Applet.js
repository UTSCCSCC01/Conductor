import React, { useEffect, useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
// Style
import '../BotBuilderPage.css';
import { FaRobot } from 'react-icons/fa';
import { IoMdAppstore } from 'react-icons/io';
import { VscFileBinary } from 'react-icons/vsc';

function Applet({ deviceId, addedApplet, onAppletSelector }) {
    const [AddedApplet, setAddedApplet] = useState(null);

    useEffect(() => {
        setAddedApplet(addedApplet);
    }, [addedApplet]);    

    const onDisplayModal = (index) => {
        if (deviceId && deviceId !== "") {
            onAppletSelector(true, index);
        } else {
            alert("Device must be selected to select applet.");
        }
    };

    return (
        <div className="bot-event-blocks">
            <SmallHeader title="Applet to Execute" />
            <div className="applet-list">
                <div 
                    onClick={() => onDisplayModal(0)}
                    className={`applet ${AddedApplet === 0 ? "selected" : ""}`}
                >
                    <FaRobot />
                    <div>
                        <h3>Orchestra Web Bot</h3>
                        <p>Apps from orchestra store</p>
                    </div>
                </div>
                <div 
                    onClick={() => onDisplayModal(1)}
                    className={`applet ${AddedApplet === 1 ? "selected" : ""}`}
                >
                    <IoMdAppstore />
                    <div>
                        <h3>Native Application</h3>
                        <p>Apps detected by Cognitavit</p>
                    </div>
                </div>
                <div 
                    onClick={() => onDisplayModal(2)}
                    className={`applet ${AddedApplet === 2 ? "selected" : ""}`}
                >
                    <VscFileBinary />
                    <div>
                        <h3>Custom Binaries</h3>
                        <p>Binaries from Cognitavit</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Applet;