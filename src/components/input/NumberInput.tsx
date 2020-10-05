import React, { FC, ChangeEvent } from 'react';

export interface NumberInputProps {
    value: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    label: string;
    placeholder?: string;
}

export const NumberInput: FC<NumberInputProps> = ({className, value, onChange, label, placeholder}) => {
    return (
        <div className='ob-input'>
            <input 
                className={`ob-input__root ${className ? className : ''}`}
                onChange={onChange}
                value={value}
                aria-label={label}
                placeholder={placeholder}
                type='number'
            />
            <label className={`ob-input__label`}>
                {label}
            </label>
        </div>
    )
}
