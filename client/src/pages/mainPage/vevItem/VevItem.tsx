import React from 'react';
import './VevItem.css';

import { useUsersContext } from '../../../contexts/usersContext';
import { useVevContext } from '../../../contexts/vevContext';

// import editIcon from '../../../assets/edit.svg';


interface vevItemProps {
    vev: IVev;
    className?: string;
}

const VevItem: React.FC<vevItemProps> = ({vev, className}) => {
    const { getUserById } = useUsersContext();
    const { setSelectedVevToUpdate } = useVevContext();
    const [ expanded, setExpanded ] = React.useState(false);
    
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const openUpdatePopup = (event: any) => {
        event.stopPropagation();
        setSelectedVevToUpdate(vev);
    }


    try {
        const challenger = getUserById(vev.challengerId);
        const challenged = getUserById(vev.challengedId);
        const now = new Date();
        
        if (expanded) {
            return (
            <li className={`vev-item vev-item-detailed ${className}`} onClick={toggleExpanded}>
                    {/* <button className='vev-item-edit'>
                        <img src={editIcon} alt="edit" onClick={e => openUpdatePopup(e)}/>
                    </button> */}

                    <p>
                        <span>Utmanare:</span>
                        <span className='username'>{challenger.username}</span>
                    </p>
                    <p>
                        <span>Utmanar: </span>
                        <span className='username'>{challenged.username}</span>
                    </p>
                    <p>
                        <span>Datum:</span>
                        <span>{new Date(vev.date).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                    </p>
                    <p>
                        <span>Klockan:</span>
                        <span>{new Date(vev.date).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                    <p>
                        <span>Anledning:</span>
                        <span>{vev.reason}</span>
                    </p>
                    {vev.date < now && (
                        <>
                            <p>
                                <span>Vinnare:</span>
                                <span className={` ${vev.winner ? "username" : ""}`}>{vev.winner ? vev.winner : "---"}</span>
                            </p>
                            <button 
                                className='vev-item-button' 
                                onClick={e => openUpdatePopup(e)}
                            >
                                Uppdatera vinnare
                            </button>
                        </>
                    )}
            </li>
        )}
        else return (
            <li className={`vev-item vev-item-preview ${className}`} onClick={toggleExpanded}>
                <p>{challenger.username}</p>
                <p>{challenged.username}</p>
                <p>{new Date(vev.date).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
            </li>
        );
    } catch (error) {
        return null
    }


};

export default VevItem;