import React from 'react';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
    children: string;
    to?: string | null;
    type?: 'button' | 'submit' | 'reset' | undefined;
    size?: 'big' | 'small';
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}

const Button = ({ children, to, type = 'button', size = 'big', onClick, disabled }: ButtonProps) => {
    const Component = to ? Link : 'button';
    const buttonType = to ? undefined : type;
    return (
        <Component
            href={to ?? ''}
            type={buttonType}
            className={`${styles.button} ${styles[`button--${size}`]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </Component>
    );
};

export default Button;
