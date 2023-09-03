import { ReactNode } from 'react';
import style from './Layout.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className={style.Layout}>
            <Header />
            <main className={style.Layout__main}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
