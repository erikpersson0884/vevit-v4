import { useEffect, useRef, useState } from 'react';
import './MainPage.css';

import { useVevContext } from '../../contexts/vevContext';
import { useAuthContext } from '../../contexts/authContext';

import VevItem from '../../components/vevItem/VevItem';
import UserFilter from '../../components/Filter/userFilter/UserFilter';
import TimeFilter from '../../components/Filter/timeFilter/TimeFilter';

import CreateVevPopup from '../../components/createVevPopup/CreateVevPopup';
import { useUsersContext } from '../../contexts/usersContext';
import sortIcon from '../../assets/down.svg';

const MainPage: React.FC = () => {
    const [ showCreateVevPopup, setShowCreateVevPopup ] = useState(false);
    const { toggleSort } = useVevContext();

    return (
        <div className='main-page'>
            <CreateVevPopup isOpen={showCreateVevPopup} onClose={() => setShowCreateVevPopup(false)} />
                
            <Filters />

            <BookVevButton openPopup={() => setShowCreateVevPopup(true)} />

            <div className='vev-list'>
                <header>
                    <p onClick={() => {toggleSort("challenged")}}>
                        <span>Utmanare</span>
                        <img src={sortIcon} alt="Sort icon" />
                    </p>
                    <p onClick={() => toggleSort("challenged")}>
                        <span>Utmanad</span>
                        <img src={sortIcon} alt="Sort icon" />
                    </p>
                    <p onClick={() => toggleSort("time")}>
                        <span>Datum</span>
                        <img src={sortIcon} alt="Sort icon" />
                    </p>
                </header>
                
                <hr />
                <VevList />
            </div>

        </div>
    );
};

const Filters = () => {
    const { currentUser } = useAuthContext();
    const [ showFilters, setShowFilters ] = useState(false);

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

    if (loadingUsers) return <p>Laddar användare...</p>
    if (filteredVevs.length === 0) return <p>Inga vev bokade</p>

    const containerRef = useRef<HTMLDivElement | null>(null);
    const { fetchVevs } = useVevContext();

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            if (container.scrollHeight - container.scrollTop - container.clientHeight < 200) {
                console.log('Near bottom, fetching more vevs...');
                fetchVevs(); // load next page when 100px from bottom
            }
        };

        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [fetchVevs]);

    return (
        <div ref={containerRef} className='vev-list-container'>
            {[...filteredVevs].map((vev) => (
                <VevItem key={vev.id} vev={vev} />
            ))} 
        </div>
    )
};

export default MainPage;