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

/**
 * PopupWindow component renders a modal popup window with customizable content and actions.
 *
 * @component
 * @param {PopupWindowProps} props - The properties for the PopupWindow component.
 * @param {boolean} props.isOpen - Determines whether the popup window is open or not.
 * @param {() => void} props.onClose - Callback function triggered when the popup is closed.
 * @param {() => void} [props.onAccept=onClose] - Callback function triggered when the accept button is clicked. Defaults to `onClose`.
 * @param {() => void} [props.onCancel=onClose] - Callback function triggered when the cancel button is clicked. Defaults to `onClose`.
 * @param {string} [props.title] - The title of the popup window. If not provided, no title is displayed.
 * @param {string} [props.buttonText] - The text displayed on the accept button. Defaults to "Skapa".
 * @param {React.ReactNode} props.children - The content to be displayed inside the popup window.
 * @param {string} [props.className] - Additional CSS class names to apply to the popup body.
 *
 * @returns {JSX.Element | null} The rendered PopupWindow component, or `null` if `isOpen` is false.
 */
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