import React from 'react';
import './VevPopup.css';

import PopupWindow from '../popupWindow/PopupWindow';
import { useUsersContext } from '../../contexts/usersContext';
import { useVevContext } from '../../contexts/vevContext';
import { useAuthContext } from '../../contexts/authContext';

import editIcon from '../../assets/edit.svg';


interface VevInfoPopupProps {
    openUpdatePopup: (event: any) => void;
}

const VevInfoPopup: React.FC<VevInfoPopupProps> = ({openUpdatePopup}) => {
    const { getUserById } = useUsersContext();
    const { currentUser } = useAuthContext();

    const { selectedVev, setSelectedVev } = useVevContext();
    if (!selectedVev) return null;

    const challenger = getUserById(selectedVev.challengerId);
    const challenged = getUserById(selectedVev.challengedId);
    const now = new Date();

    const vevDate = new Date(selectedVev.date).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const vevTime = new Date(selectedVev.date).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    
    const showEditButton = (currentUser?.id === selectedVev.challengerId || currentUser?.id === selectedVev.challengedId) && selectedVev.date < now;


    return (
        <PopupWindow
            className="selectedVev-popup vev-info-popup"
            onClose={() => setSelectedVev(null)}
            isOpen={selectedVev !== null}
        >
            {showEditButton && 
                <button className='open-update-vev-button' onClick={openUpdatePopup}>
                    <img src={editIcon} alt="Redigera" />
                </button>
            }

            <h2>{vevDate}</h2>
            <h3>{vevTime}</h3>

            <p className='selectedVev-item-names'>
                <span className='name'>{challenger.username}</span>
                <span> vs </span>
                <span className='name'>{challenged.username}</span>
            </p>

            {selectedVev.date < now && (
                <>
                    <p>
                        <span>Vinnare: </span>
                        <span className={` ${selectedVev.winnerId ? "name" : ""}`}>
                            {selectedVev.winnerId ? getUserById(selectedVev.winnerId).username : "Ingen"}
                        </span>
                    </p>
                </>
            )}
            { selectedVev.reason.length > 0 &&
                <p>
                    <span>Anledning: </span>
                    <span>{selectedVev.reason}</span>
                </p>
            }
        </PopupWindow>
    );
}

export default VevInfoPopup;
