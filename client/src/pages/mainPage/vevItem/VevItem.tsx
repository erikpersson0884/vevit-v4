import React from 'react';
import './VevItem.css';

import { useUsersContext } from '../../../contexts/usersContext';

interface vevItemProps {
    vev: IVev;
}

const VevItem: React.FC<vevItemProps> = ({vev}) => {
    const { getUserById } = useUsersContext();

    try {
        const challenger = getUserById(vev.challengerId);
        const challenged = getUserById(vev.challengedId);

        return (
            <li className='vev-item'>
                <p>{challenger.username}</p>
                <p>{challenged.username}</p>
                <p>{new Date(vev.date).toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(' ', ' ')}</p>
            </li>
        );
    } catch (error) {
        return null
    }


};

export default VevItem;