import React, { FC, ChangeEvent } from 'react';

export interface TextInputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    label: string;
    placeholder?: string;
}

export const TextInput: FC<TextInputProps> = ({className, value, onChange, label, placeholder}) => {
    return (
        <div className='ob-input'>
            <input 
                className={`ob-input__root ${className ? className : ''}`}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                aria-label={label}
                type='text'
            />
            <label className={`ob-input__label`}>
                {label}
            </label>
        </div>
    );
}
