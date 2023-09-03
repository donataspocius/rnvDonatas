// import styles from './Hero.module.scss';
import Button from '../Button/Button';
import styles from './Hero.module.scss';

const Hero = () => {
    return (
        <div className={styles.heroBanner}>
            <div className={styles.heroBannerContent}>
                <h1>Life is Short, Watch a Movie</h1>
                <Button size="big" to="/movies">
                    Browse the Reels
                </Button>
            </div>
        </div>
    );
};

export default Hero;
