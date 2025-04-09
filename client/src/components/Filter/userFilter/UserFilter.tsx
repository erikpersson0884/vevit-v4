import React from 'react';
import Filter from '../Filter';
import { useVevContext } from '../../../contexts/vevContext';
import { useAuthContext } from '../../../contexts/authContext';


const UserFilter: React.FC = () => {
    const { currentUser } = useAuthContext();
    const { setFilteredVevs, vevs } = useVevContext();

    const options: IFilterOption<string>[] = [
        { label: 'Alla vev', value: 'all'},
        { label: 'Mina vev', value: currentUser?.id || '' },
    ];

    const handleFilterChange = (selectedValue: string) => {
        if (selectedValue === 'all') {
            setFilteredVevs(vevs);
        } else {
            setFilteredVevs(vevs.filter(vev => vev.challengerId === currentUser?.id));
        }
    };

    return (
        <Filter options={options} onFilterChange={handleFilterChange} />
    );
};

export default UserFilter;