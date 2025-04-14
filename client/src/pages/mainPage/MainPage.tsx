import React from 'react';
import './mainPage.css';

import { useVevContext } from '../../contexts/vevContext';
import { useAuthContext } from '../../contexts/authContext';

import VevItem from './vevItem/VevItem';
import UserFilter from '../../components/Filter/userFilter/UserFilter';
import TimeFilter from '../../components/Filter/timeFilter/TimeFilter'; 

import CreateVevPopup from '../../components/createVevPopup/CreateVevPopup';


const MainPage: React.FC = () => {
    const { filteredVevs } = useVevContext();
    const { currentUser } = useAuthContext();
    const [ showCreateVevPopup, setShowCreateVevPopup ] = React.useState(false);

    return (
        <div className='main-page'>

            <div className='filter-container'>
                <UserFilter />

                {currentUser && (
                    <button 
                        className='create-vev-button' 
                        onClick={() => setShowCreateVevPopup(true)}
                    >Skapa vev</button>
                )}
            </div>
            
            <TimeFilter />

            <CreateVevPopup isOpen={showCreateVevPopup} onClose={() => setShowCreateVevPopup(false)}/>
            
            {filteredVevs.length > 0 && (
                <ul className='vev-list no-ul-formatting'>
                    <li className='vev-item'>
                        <p>Utmanare</p>
                        <p>Utmanad</p>
                        <p>Datum</p>
                    </li>
                    
                    <hr />

                    {filteredVevs.map((vev) => (
                        <VevItem key={vev.id} vev={vev} />
                    ))} 
                </ul>
            )}
        </div>
    );
};

export default MainPage;