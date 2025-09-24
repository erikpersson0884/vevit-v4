import { FC } from 'react';
import './Filter.css';

interface FilterProps<T> {
    options: IFilterLabelOption<T>[];
    onFilterChange: (selectedValue: T) => void;
    activeOption: T;
}

const Filter: FC<FilterProps<any>> = ({ options, onFilterChange, activeOption }) => {
    const handleOptionClick = (clickedOption: IFilterLabelOption<any>) => {
        if (clickedOption.value === activeOption) {
            const currentIndex = options.findIndex(option => option.value === activeOption);
            const nextIndex = (currentIndex + 1) % options.length;
            onFilterChange(options[nextIndex].value);
        } else {
            onFilterChange(clickedOption.value);
        }
    };

    return (
        <ul className="filter no-ul-formatting">
            {options.map((option) => (
                <li
                    key={option.value as string}
                    className={`filter-option ${option.value === activeOption ? "active" : ""}`}
                    onClick={() => handleOptionClick(option)}
                >
                    <p>{option.label}</p>
                </li>
            ))}
        </ul>
    );
};

export default Filter;
