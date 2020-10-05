import React, { FC, ChangeEvent } from 'react';

export interface TextAreaProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    label: string;
    placeholder?: string;
}

export const TextArea: FC<TextAreaProps> = ({className, value, onChange, label, placeholder}) => {
    return (
        <div className='ob-textarea'>
            <textarea 
                className={`ob-textarea__root ${className ? className : ''}`}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                aria-label={label}
                rows={4}
            />
            <label className={`ob-textarea__label`}>
                {label}
            </label>
        </div>
    )
}
