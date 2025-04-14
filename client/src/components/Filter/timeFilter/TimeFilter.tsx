import React from 'react';
import Filter from '../Filter';
import { useVevContext } from '../../../contexts/vevContext';


const TimeFilter: React.FC = () => {
    const { setFilteredVevs, vevs } = useVevContext();

    const options: IFilterOption<string>[] = [
        { label: 'Alla vev', value: 'all'},
        { label: 'Framtida vev', value: 'future-vevs'},
        { label: 'Passerade vev', value: 'past-vevs' },
    ];

    const handleFilterChange = (selectedValue: string) => {
        const currentDate = new Date();
        
        if (selectedValue === 'all') {
            setFilteredVevs(vevs);
        } else if (selectedValue === 'past-vevs') {
            setFilteredVevs(vevs.filter(vev => vev.date < currentDate));
        } else if (selectedValue === 'future-vevs') {
            setFilteredVevs(vevs.filter(vev => vev.date > currentDate));
        } else {
            throw new Error(`Unknown filter option: ${selectedValue}`);
        }
    };

    return (
        <Filter options={options} onFilterChange={handleFilterChange} />
    );
};

export default TimeFilter;