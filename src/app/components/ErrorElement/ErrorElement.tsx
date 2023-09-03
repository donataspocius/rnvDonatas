import style from './ErrorElement.module.scss';

const ErrorElement = ({ error }: { error: string }) => {
    return (
        <div className={style.errorContainer}>
            <h3>Ooops, an error occured: </h3>
            <p>{error}</p>
        </div>
    );
};

export default ErrorElement;
