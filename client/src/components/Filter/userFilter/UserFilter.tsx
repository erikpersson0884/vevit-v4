import React from 'react';
import Filter from '../Filter';
import { useVevContext } from '../../../contexts/vevContext';

const UserFilter: React.FC = () => {
    const { setFilters } = useVevContext();

    const options: IFilterOption<string>[] = [
        { label: 'Alla vev', value: 'all' },
        { label: 'Mina vev', value: 'mine' },
    ];

    const handleFilterChange = (selectedValue: "all" | "mine") => {
        setFilters(prev => ({
            ...prev,
            userFilter: selectedValue,
        }));
    };

    return (
        <Filter options={options} onFilterChange={handleFilterChange} />
    );
};

export default UserFilter;
