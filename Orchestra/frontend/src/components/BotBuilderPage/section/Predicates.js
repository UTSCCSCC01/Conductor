import React, { useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
// Style
import '../BotBuilderPage.css';
import { DiHaskell } from 'react-icons/di';
import { MdAddCircleOutline } from 'react-icons/md';

function Predicates({ onSave }) {
    const [SelectedApplet, setSelectedApplet] = useState(null);

    const onApplet = (index) => {
        setSelectedApplet(index);
        onSave(index);
    };

    return (
        <div className="bot-event-blocks">
            <SmallHeader title="Predicates" />
            <div className="applet-list">
                <div 
                    className={`applet ${SelectedApplet === 0 ? "selected" : ""}`} 
                    onClick={() => onApplet(0)}
                >
                    <DiHaskell />
                    <div>
                        <h3>Create a new Predicate</h3>
                        <p>Limitless possibilities. Start an applet execution for any reason. </p>
                    </div>
                </div>
                <div 
                    className={`applet ${SelectedApplet === 1 ? "selected" : ""}`} 
                    onClick={() => onApplet(1)}
                >
                    <DiHaskell />
                    <div>
                        <h3>Execute upon http req</h3>
                        <p>Resolves to true, if recieved ...</p>
                    </div>
                </div>
                <div className="applet save">
                    <MdAddCircleOutline />
                    <div><h3>Add a new predicate</h3></div>
                </div>
            </div>
        </div>
    );
}

export default Predicates;