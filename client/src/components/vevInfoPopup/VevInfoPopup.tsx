import React from 'react';
import './VevPopup.css';

import PopupWindow from '../popupWindow/PopupWindow';
import { useUsersContext } from '../../contexts/usersContext';
import { useVevContext } from '../../contexts/vevContext';
import { useAuthContext } from '../../contexts/authContext';

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
    
    return (
        <PopupWindow
            className="selectedVev-popup vev-info-popup"
            onClose={() => setSelectedVev(null)}
            isOpen={selectedVev !== null}
        >

            <h2>{new Date(selectedVev.date).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</h2>
            <h3>{new Date(selectedVev.date).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}</h3>
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
                            {selectedVev.winnerId ? getUserById(selectedVev.winnerId).username : "Ingen satt"}
                        </span>
                    </p>
                    {currentUser && currentUser.id === selectedVev.challengerId && (
                        <button 
                            className='selectedVev-item-button' 
                            onClick={openUpdatePopup}
                        >
                            Uppdatera vinnare
                        </button>
                    )}
                </>
            )}
            <p>
                <span>Anledning: </span>
                <span>{selectedVev.reason}</span>
            </p>
        </PopupWindow>
    );
}

export default VevInfoPopup;
