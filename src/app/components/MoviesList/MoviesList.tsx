import { API } from "../../constants/web_constants/appConstants";
import { MovieCardProps } from "../../constants/web_constants/types";
import useFetchData from "../../utils/customHooks";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MoviesList.module.scss";

interface SimilarMoviesProps {
  genre: string;
  title: string;
  movieId?: string;
}

const MoviesList = ({ genre, movieId, title }: SimilarMoviesProps) => {
  const { data } = useFetchData(API.getMoviesByGenre(genre, 1, 15));

  const moviesData = data?.data.data.filter((movie: MovieCardProps) => {
    return movie.id !== movieId;
  });
  const content = moviesData?.map((movie: MovieCardProps) => {
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        posterUrl={movie.posterUrl}
      />
    );
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.hrContainer}>
            <div className={styles.hr}></div>
          </div>
        </div>
        {/* <a href="/">{`See All ${genre} movies`}</a> */}
      </div>
      <div className={styles.similarMoviesContainer}>{data && content}</div>
    </div>
  );
};

export default MoviesList;
