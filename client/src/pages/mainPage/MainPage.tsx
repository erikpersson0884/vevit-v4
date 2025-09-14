import React from 'react';
import './MainPage.css';

import { useVevContext } from '../../contexts/vevContext';
import { useAuthContext } from '../../contexts/authContext';

import VevItem from '../../components/vevItem/VevItem';
import UserFilter from '../../components/Filter/userFilter/UserFilter';
import TimeFilter from '../../components/Filter/timeFilter/TimeFilter';

import CreateVevPopup from '../../components/createVevPopup/CreateVevPopup';
import { useUsersContext } from '../../contexts/usersContext';


const MainPage: React.FC = () => {
    const [ showCreateVevPopup, setShowCreateVevPopup ] = React.useState(false);

    return (
        <div className='main-page'>
            <CreateVevPopup isOpen={showCreateVevPopup} onClose={() => setShowCreateVevPopup(false)} />
                
            <Filters />

            <BookVevButton openPopup={() => setShowCreateVevPopup(true)} />

            <VevList />
        </div>
    );
};

const Filters = () => {
    const { currentUser } = useAuthContext();
    const [ showFilters, setShowFilters ] = React.useState(false);

    if (!showFilters) {
        return (
            <button onClick={() => setShowFilters(true)}>
                Visa filter
            </button>
        );
    } 
    else return (
        <div className='filters'>
            <TimeFilter />
            {currentUser && ( <UserFilter /> )}        
        </div>
    )
};

interface BookVevButtonProps {
    openPopup: () => void;
}

const BookVevButton: React.FC<BookVevButtonProps> = ({ openPopup }) => {
    const { currentUser } = useAuthContext();

    if (!currentUser) return null;

    return (
        <button 
            className='create-vev-button' 
            onClick={openPopup}
        >
            Boka vev
        </button>
    );
};

const VevList = () => {
    const { filteredVevs } = useVevContext();
    const { loadingUsers } = useUsersContext();

    if (loadingUsers) {
        return <p>Laddar användare...</p>
    }

    if (filteredVevs.length === 0) {
        return <p>Inga vev bokade</p>
    }

    return (
        <ul className='vev-list no-ul-formatting'>
            <header>
                <p>Utmanare</p>
                <p>Utmanad</p>
                <p>Datum</p>
            </header>
            
            <hr />

            {[...filteredVevs]
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((vev) => (
                    <VevItem key={vev.id} vev={vev} />
                ))} 
        </ul>
    )
};

export default MainPage;