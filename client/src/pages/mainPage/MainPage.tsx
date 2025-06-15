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
                    >
                        Boka vev
                    </button>
                )}
            </div>
            
            <TimeFilter />

            <CreateVevPopup isOpen={showCreateVevPopup} onClose={() => setShowCreateVevPopup(false)}/>
            
            {filteredVevs.length > 0 && (
                <ul className='vev-list no-ul-formatting'>
                    <header>
                        <p>Utmanare</p>
                        <p>Utmanad</p>
                        <p>Datum</p>
                    </header>
                    
                    <hr />

                    {[...filteredVevs]
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((vev, index) => (
                            <VevItem 
                                key={vev.id} 
                                vev={vev} 
                                className={index % 2 === 0 ? 'colored-1' : 'colored-2'}
                            />
                        ))} 
                </ul>
            )}
        </div>
    );
};

export default MainPage;