import React from 'react';
import './button.scss';

export const LagoButton = ({
    children: text,
    type = 'default',
    arrowDirection = 'right',
    onClick
}) => {
    const classNames = ['lago__btn'];

    if (type === 'arrow') {
        classNames.push('lago__arrow');
        classNames.push(`lago__arrow--${arrowDirection}`);
    }

    return <div className={classNames.join(' ')} onClick={onClick}>{text}</div>;
};
