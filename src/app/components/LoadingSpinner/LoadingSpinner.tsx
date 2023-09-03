// import RingLoader from 'react-spinners/RingLoader';
import style from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={style.loadingContainer}>
      Loading...
      {/* <RingLoader color="#d06027" size={70} speedMultiplier={1.5} /> */}
    </div>
  );
};

export default LoadingSpinner;
