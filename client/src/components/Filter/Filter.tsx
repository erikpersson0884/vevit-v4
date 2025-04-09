import React, { useState } from 'react';
import './Filter.css';


interface FilterProps<T> {
    options: IFilterOption<T>[];
    onFilterChange: (selectedValue: T) => void;
}

const Filter: React.FC<FilterProps<any>> = ({ options, onFilterChange }) => {
    const [chosenOption, setChosenOption] = useState<IFilterOption<any>>(options[0]);

    const handleOptionClick = (clickedOption: IFilterOption<any>) => {
        // If the clicked option is the current one, cycle to the next
        if (clickedOption.value === chosenOption.value) {
            const currentIndex = options.findIndex(option => option.value === chosenOption.value);
            const nextIndex = (currentIndex + 1) % options.length;
            setChosenOption(options[nextIndex]);
            onFilterChange(options[nextIndex].value);
        } else {
            setChosenOption(clickedOption);
            onFilterChange(clickedOption.value);
        }
    };


    return (
        <div className="filter">
            {options.map((option) => (
                <div
                    key={option.value as string}
                    className={`filter-option ${option.value === chosenOption.value ? "active" : ""}`}
                    onClick={() => handleOptionClick(option)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    );
};

export default Filter;
