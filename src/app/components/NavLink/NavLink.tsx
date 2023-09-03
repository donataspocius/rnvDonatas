import React, { Children } from 'react';
import { useRouter } from 'next/router';
import styles from '../Header/Header.module.scss';
import Link, { LinkProps } from 'next/link';

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
    activeClassName?: string;
};

export const NavLink = ({ children, ...props }: NavLinkProps) => {
    const { asPath } = useRouter();

    const isActive = asPath === props.href || asPath === props.as;

    const className = isActive ? `${styles.navLinks} ${styles.active}` : `${styles.navLinks}`;

    return (
        <Link className={className} {...props}>
            {children}
        </Link>
    );
};
