import React, { Fragment, InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.scss';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    type?: 'text' | 'email' | 'password' | 'search' | 'radio';
    name?: string | undefined;
    value?: any;
    placeholder?: string;
}

const Input = forwardRef(
    (
        { id, label, type = 'text', name, value, onChange, placeholder }: InputProps,
        ref: React.LegacyRef<HTMLInputElement> | undefined
    ) => {
        const uniqueId = useId();
        return (
            <div className={styles.inputContainer}>
                <label htmlFor={id || uniqueId}>{label}</label>
                <input
                    className={styles.input}
                    id={id || uniqueId}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    ref={ref}
                />
            </div>
        );
    }
);

export default Input;
