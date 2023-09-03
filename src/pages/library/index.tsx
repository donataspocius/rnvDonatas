import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { API } from "../../app/constants/web_constants/appConstants";
import useFetchData from "../../app/utils/customHooks";
import { selectUserId } from "../../app/state/auth/authSlice";
import LoadingSpinner from "../../app/components/LoadingSpinner/LoadingSpinner";
import ErrorElement from "../../app/components/ErrorElement/ErrorElement";
import style from "../movies/Movies.module.scss";
import { MovieCardProps } from "../../app/constants/web_constants/types";
import MovieCard from "../../app/components/MovieCard/MovieCard";
import { setUserFavorites } from "../../app/state/content/contentSlice";

const Library = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const { data, isLoading, error } = useFetchData(API.userDataEnpoint(userId));

  const movieData = data?.data.favoriteMovies;

  useEffect(() => {
    if (movieData) {
      dispatch(setUserFavorites(movieData));
    }
  }, [dispatch, movieData]);

  const content = movieData?.map((movie: MovieCardProps) => {
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
    <div className={style.movieCardsContainer}>
      {content?.length ? content : <h2>Your favorite list is empty</h2>}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorElement error={error} />}
    </div>
  );
};

export default Library;
