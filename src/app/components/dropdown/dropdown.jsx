import React from 'react';
import './dropdown.scss';

export const LagoDropdown = ({ items, onClick }) => (
    <div className="lago__dropdown">
        {items.map(({ value, label }) => (
            <LagoDropdownItem
                key={value}
                value={value}
                label={label}
                onClick={onClick}
            />
        ))}
    </div>
);

export const LagoDropdownItem = ({ value, label, onClick }) => (
    <div
        className="lago__dropdown-item"
        onClick={() => onClick({ value, label })}
    >
        {label}
    </div>
);
