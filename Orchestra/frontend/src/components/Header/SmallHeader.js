import React from 'react';
import { useNavigate } from 'react-router';
import BlueButton from '../Button/BlueButton';
import ModalButton from '../Button/ModalButton';
import './Header.css';

// Component for Header
function SmallHeader({ title, buttonName1, buttonName2, onButton, path }) {
    const navigate = useNavigate();

    const onPathButton = () => {
        navigate(path);
    }

    return (
        <div className="page-header small">
            <h2>{title}</h2>
            <div className="header-buttons">
                <BlueButton text={buttonName1} onButton={onPathButton} />
                {buttonName2 && onButton && <ModalButton text={buttonName2} onButton={onButton} />}
            </div>
        </div>
    );
}

export default SmallHeader;