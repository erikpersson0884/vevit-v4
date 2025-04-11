import React from 'react';
import './popupWindow.css';
import Modal from '../modal/Modal';
import closeIcon from '../../assets/close.svg';

interface PopupWindowProps {
    children: React.ReactNode;
    isOpen: boolean;
    onAccept?: () => any;
    onCancel?: () => any;
    onClose: () => any;

    title?: string;
    buttonText?: string;

    className?: string;
}

const PopupWindow: React.FC<PopupWindowProps> = ({ isOpen, onClose, onAccept = onClose, onCancel = onClose, title, buttonText, children, className }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={`popup-window `} onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    {title && <h2 className="popup-title">{title}</h2>}

                    <button className="close-button" onClick={onClose}>
                        <img src={closeIcon} alt="Close" className="close-icon" />
                    </button>
                    
                    <div className={`popup-body ${className || ''}`}>
                        {children}
                    </div>

                    <div className='popup-footer'>
                        <button className="popup-button" onClick={onAccept}>{buttonText ? buttonText : 'Skapa'}</button>
                        <button className="popup-button" onClick={onCancel}>Avbryt</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PopupWindow;