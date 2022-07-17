import React, { useEffect, useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
import StatusButton from '../../Button/StatusButton';
import Table from '../../Table/Table';
// Style
import '../BotBuilderPage.css';
import { Modal } from 'antd';
import { FaRobot } from 'react-icons/fa';
import { IoMdAppstore } from 'react-icons/io';
import { VscFileBinary } from 'react-icons/vsc';

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
    }
];

function Applet({ onSave }) {
    const [SelectedApplet, setSelectedApplet] = useState(null);
    const [DisplayModal, setDisplayModal] = useState(null);
    const [WebBots, setWebBots] = useState([]);

    useEffect(() => {
        setWebBots(webBots);
    }, [DisplayModal]);

    // Bot Events Table Header
    const appletOneHeader = <div className="table-header">
        <div className="row large"><h3>Name</h3></div>
        <div className="row extralarge"><h3>Description</h3></div>
        <div className="row medium"></div>
    </div>;

    // Installed Bots Table Body
    const appletOneBody = () => {
        const onSelect = (index) => {
            setSelectedApplet([0, webBots[index]]);
            onSave(webBots[index]);
            setDisplayModal(null);
        };

        const rows = WebBots.map((row, index) => {
            return (
                <div key={index} className="table-body-row">
                    <div className="row large"><p>{row.name}</p></div>
                    <div className="row extralarge"><p>{row.description}</p></div>
                    <div className="row medium flexend">
                        <StatusButton text="Select" onButton={() => onSelect(index)} />
                    </div>
                </div>
            );
        });
        
        return (
            <div className="table-body">{rows}</div>
        );
    };

    return (
        <div className="bot-event-blocks">
            <Modal 

                title="Orchestra Web Bot" 
                visible={DisplayModal === 0} 
                destroyOnClose={true}
                onCancel={() => setDisplayModal(null)}
                footer={[]}
                className="applet-modal"
            >
                <Table 
                    tableHeader={appletOneHeader} 
                    tableBody={appletOneBody()} 
                    isEmpty={WebBots.length === 0} 
                    emptyText="No Bots"
                />
            </Modal>
            <Modal 
                title="Native Application" 
                visible={DisplayModal === 1} 
                destroyOnClose={true}
                onCancel={() => setDisplayModal(null)}
                footer={[]}
                className="applet-modal"
            >
                Apps detected by Cogitavit
            </Modal>
            <Modal 
                title="Custom Binaries" 
                visible={DisplayModal === 2} 
                destroyOnClose={true}
                onCancel={() => setDisplayModal(null)}
                footer={[]}
                className="applet-modal"
            >
                Binaries from Cogitavit
            </Modal>
            <SmallHeader title="Applet to Execute" />
            <div className="applet-list">
                <div 
                    onClick={() => setDisplayModal(0)}
                    className={`applet ${SelectedApplet && SelectedApplet[0] === 0 ? "selected" : ""}`}
                >
                    <FaRobot />
                    <div>
                        <h3>Orchestra Web Bot</h3>
                        <p>Apps from orchestra store</p>
                    </div>
                </div>
                <div 
                    onClick={() => setDisplayModal(1)}
                    className={`applet ${SelectedApplet && SelectedApplet[0] === 1 ? "selected" : ""}`}
                >
                    <IoMdAppstore />
                    <div>
                        <h3>Native Application</h3>
                        <p>Apps detected by Cognitavit</p>
                    </div>
                </div>
                <div 
                    onClick={() => setDisplayModal(2)}
                    className={`applet ${SelectedApplet && SelectedApplet[0] === 2 ? "selected" : ""}`}
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