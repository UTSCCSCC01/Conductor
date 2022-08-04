import React, { useEffect, useState } from 'react';
// Components
import SmallHeader from '../../Header/SmallHeader';
// Style
import '../BotBuilderPage.css';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';


function EventConfigs({ eventConfig, onSave }) {
    const [Checked, setChecked] = useState([]);

    useEffect(() => {
        setChecked(eventConfig);
    }, [eventConfig]);
    
    const onCheck = (index) => {
        let checked = Checked.slice();
        if (!checked || checked === [] || checked.length === 0) {
            checked = [index];
        } else if (checked.includes(index)) {
            checked = checked.filter(config => config !== index);
            if (!checked || checked === [] || checked.length === 0) {
                checked = [];
            } else if (!Array.isArray(checked)) {
                checked = [checked];
            }
        } else {
            checked.push(index);
            setChecked(checked);
        }
        setChecked(checked);
        onSave(checked);
    };

    const selectedCheckBox = (index, text) => {
        return (
            <div className="config">
                <div onClick={() => onCheck(index)} className="checked">
                    <FiCheckSquare />
                </div>
                <p>{text}</p>
            </div>
        );
    };

    const checkBox = (index, text) => {
        return (
            <div className="config">
                <div onClick={() => onCheck(index)}><FiSquare /></div>
                <p>{text}</p>
            </div>
        );
    };

    return (
        <div className="bot-event-blocks">
            <SmallHeader title="Event Configs" />
            <div className="event-configs">
                {Array.isArray(Checked) && Checked.includes(1)
                    ? selectedCheckBox(1, "Run after event passed")
                    : checkBox(1, "Run after event passed")
                }
                {Array.isArray(Checked) && Checked.includes(2)
                    ? selectedCheckBox(2, "Hang till predicate satisfied")
                    : checkBox(2, "Hang till predicate satisfied")
                }
                {Array.isArray(Checked) && Checked.includes(3)
                    ? selectedCheckBox(3, "On client failure. Retry Signal")
                    : checkBox(3, "On client failure. Retry Signal")
                }
            </div>
        </div>
    );
}

export default EventConfigs;