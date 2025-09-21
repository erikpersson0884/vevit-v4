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
import closeIcon from '../../assets/close.svg';

const MainPage: React.FC = () => {
    const [ showCreateVevPopup, setShowCreateVevPopup ] = useState(false);
    const [ showFilters, setShowFilters ] = useState(false);

    return (
        <div className='main-page'>
            <CreateVevPopup isOpen={showCreateVevPopup} onClose={() => setShowCreateVevPopup(false)} />
                
            <div className={"top-bar" + (showFilters ? ' top-bar-filters-open' : '')}>
                <Filters showFilters={showFilters} setShowFilters={setShowFilters} /> 
                <BookVevButton openPopup={() => setShowCreateVevPopup(true)} />
            </div>

            <VevList />
        </div>
    );
};


interface FiltersProps {
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({showFilters, setShowFilters}) => {
    const { currentUser } = useAuthContext();

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
            <button className='close-button' onClick={() => setShowFilters(false)}>
                <img src={closeIcon} alt="Close icon" />
            </button> 
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
        <button className='create-vev-button' onClick={openPopup}>
            Boka vev
        </button>
    );
};

const VevListHeader = () => {
    const { toggleSort } = useVevContext();
    return (
        <header className='vev-list-header'>
            <p onClick={() => {toggleSort("challenger")}}>
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
    )
}

const VevList = () => {
    const { filteredVevs, fetchVevs } = useVevContext();
    const { loadingUsers } = useUsersContext();
    const containerRef = useRef<HTMLDivElement | null>(null);

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

    if (loadingUsers) return <p>Laddar användare...</p>


    return (  
        <div className='vev-list'>
            <VevListHeader />

            <hr />
            
            { filteredVevs.length === 0 && <p className='no-vevs-available'>Inga vev att visa</p> }

            <div ref={containerRef} className='vev-list-container'>
                {filteredVevs.map((vev) => (
                    <VevItem key={vev.id} vev={vev} />
                ))} 
            </div>
        </div>
    )
};

export default MainPage;