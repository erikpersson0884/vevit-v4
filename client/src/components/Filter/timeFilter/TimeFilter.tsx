import React from 'react';
import Filter from '../Filter';
import { useVevContext } from '../../../contexts/vevContext';


const TimeFilter: React.FC = () => {
    const { setFilters, filters } = useVevContext();

    const options: IFilterLabelOption<string>[] = [
        { label: 'Alla vev', value: "all" },
        { label: 'Kommande', value: 'future' },
        { label: 'Tidigare', value: 'past' },
    ];

    const handleFilterChange = (selectedValue: string) => {
        setFilters(prev => ({
            ...prev,
            timeFilter: selectedValue as "all" | "future" | "past",
        }));
    };

    return (
        <Filter options={options} onFilterChange={handleFilterChange} activeOption={filters.timeFilter} />
    );
};

export default TimeFilter;