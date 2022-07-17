import React, { useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
// Style
import '../BotBuilderPage.css';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';


function EventConfigs({ onSave }) {
    const [Checked, setChecked] = useState(null);

    const onCheck = (index) => {
        if (Checked === index) {
            setChecked(null);
            onSave(null);
        } else {
            setChecked(index);
            onSave(index);
        }
    };

    return (
        <div className="bot-event-blocks">
            <SmallHeader title="Event Configs" />
            <div className="event-configs">
                <div className="config">
                    <div 
                        onClick={() => onCheck(0)}
                        className={Checked === 0 ? "checked" : undefined}
                    >
                        {Checked === 0 ? <FiCheckSquare /> : <FiSquare />}
                    </div>
                    <p>Run after event passed</p>
                </div>
                <div className="config">
                    <div 
                        onClick={() => onCheck(1)}
                        className={Checked === 1 ? "checked" : undefined}
                    >
                        {Checked === 1 ? <FiCheckSquare /> : <FiSquare />}
                    </div>
                    <p>Hang till predicate satisfied</p>
                </div>
                <div className="config">
                    <div 
                        onClick={() => onCheck(2)}
                        className={Checked === 2 ? "checked" : undefined}
                    >
                        {Checked === 2 ? <FiCheckSquare /> : <FiSquare />}
                    </div>
                    <p>On client failure. Retry Signal</p>
                </div>
            </div>
        </div>
    );
}

export default EventConfigs;