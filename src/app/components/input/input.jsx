import React, { useState, useEffect, useRef } from 'react';
import LagoDropdown from '../dropdown';
import './input.scss';

export const LagoInput = ({
    items,
    onChange,
    placeholder,
    autoSelect = false
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.onfocus = () => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        };
    });
    const classNames = ['lago__input'];
    if (isFocused) {
        classNames.push('lago__input--focused');
    }
    return (
        <div className={classNames.join(' ')}>
            <input
                type="text"
                ref={inputRef}
                onChange={e => {
                    if (
                        autoSelect &&
                        items.length === 1 &&
                        e.target.value === items[0].label
                    ) {
                        setSelectedOption(items[0]);
                        setInputValue(items[0].label);
                        onChange(items[0]);
                        setShowDropdown(false);
                        return;
                    }
                    onChange(e.target.value);
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                }}
                value={inputValue}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                placeholder={placeholder}
            />
            {items && items.length !== 0 && inputValue && showDropdown && (
                <LagoDropdown
                    items={items}
                    onClick={selectedItem => {
                        setSelectedOption(selectedItem);
                        setInputValue(selectedItem.label);
                        onChange(selectedItem);
                        setShowDropdown(false);
                    }}
                />
            )}
        </div>
    );
};
