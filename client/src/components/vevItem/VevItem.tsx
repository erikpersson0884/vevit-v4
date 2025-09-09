import React from 'react';
import './VevItem.css';

import { useUsersContext } from '../../contexts/usersContext';
import { useVevContext } from '../../contexts/vevContext';

interface vevItemProps {
    vev: IVev;
    className?: string;
}

const VevItem: React.FC<vevItemProps> = ({vev, className}) => {
    const { getUserById } = useUsersContext();
    const { setSelectedVev } = useVevContext();

    const challenger = getUserById(vev.challengerId);
    const challenged = getUserById(vev.challengedId);

    return (
        <li className={`vev-item ${className}`} onClick={() => setSelectedVev(vev)}>
                <p className='name'>{challenger.username}</p>
                <p className='name'>{challenged.username}</p>
                <p>{new Date(vev.date).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
        </li>
    )}


export default VevItem;