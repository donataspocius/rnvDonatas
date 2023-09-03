import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";
import { GetServerSideProps } from "next";

import Button from "../../../app/components/Button/Button";
import VideoModal from "../../../app/components/VideoModal/VideoModal";
import style from "./MovieDetails.module.scss";
import useFetchData from "../../../app/utils/customHooks";
import { API } from "../../../app/constants/web_constants/appConstants";
import LoadingSpinner from "../../../app/components/LoadingSpinner/LoadingSpinner";
import ErrorElement from "../../../app/components/ErrorElement/ErrorElement";
import {
  addToFavorites,
  removeFromFavorites,
  selectContentFavoriteMovies,
  selectPlayVideo,
  setPlayVideo,
} from "../../../app/state/content/contentSlice";
import {
  MovieCardProps,
  MovieDetailsProps,
} from "../../../app/constants/web_constants/types";
import MoviesList from "../../../app/components/MoviesList/MoviesList";
import { selectUserId } from "../../../app/state/auth/authSlice";
import axios from "axios";

const mockVideoUrl =
  "https://imdb-video.media-imdb.com/vi1789248793/1434659607842-pgv4ql-1666275243113.mp4?Expires=1687546119&Signature=dazWMauFcRODJczaaUNG2GtodLZXdWgSuL~9OFGxnJ9I7lJBCdZAil4hiAwgoKypnOcAJKjVEV4ynC8qo0pc4MyZ3BK3gV6elLaG47XPC6edJ0jsY6Q-lsJiSg6BJms1sP5Plj2ueg~ur6ugr0x4icxQ5U~ncNSA6MHxpAsh6hlrggaJeJ8VTe8UlgYjLcrRDPL3CrOjA~vfOwDsZfiKENjVAws-~lc5SXiVdt~nPIiaxwcQ0A2022ifUB-VKsJ9ZKnnEmWoIZWbib6Rm9Ytr~pCkMs5snxuZplXPlkBtFERFZJck0TnaqKXvwpE0spIqIesei0aKgkv4AWjJzFcbA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA";

const MovieDetails = ({
  movieDetails,
}: {
  movieDetails: MovieDetailsProps;
}) => {
  const dispatch = useDispatch();
  const playVideo = useSelector(selectPlayVideo);
  const favorites = useSelector(selectContentFavoriteMovies);
  const userId = useSelector(selectUserId);

  const {
    genre,
    duration,
    posterUrl,
    rating,
    summary,
    title,
    videoUrl,
    year,
    id: movieId,
  } = movieDetails;

  const movieInFavorites = favorites.includes(movieId!);

  const onPlayVideo = () => {
    dispatch(setPlayVideo(false));
  };

  const handleAddToFavorites = () => {
    const movieData: MovieCardProps = { id: movieId ?? "", posterUrl, title };

    movieInFavorites
      ? dispatch(removeFromFavorites(movieData))
      : dispatch(addToFavorites(movieData));
  };
  return (
    <>
      {
        <>
          <div className={style.mainContainer}>
            <div className={style.imgContainer}>
              <img src={posterUrl} alt={`movie ${title} poster`} />
            </div>
            <div className={style.detailsContainer}>
              <div className={style.dataContainer}>
                <h2>{title}</h2>
                <div className={style.movieMetricsContainer}>
                  <p>
                    <AiOutlineClockCircle className={style.icon} />
                    {duration}
                  </p>
                  <p>
                    <AiOutlineStar className={style.icon} />
                    {rating}
                  </p>
                  <p>
                    <BiCameraMovie className={style.icon} />
                    {year}
                  </p>
                </div>
                <div className={style.hrContainer}>
                  <div className={style.hr}></div>
                </div>
                <div className={style.genre}>
                  {genre.map((genreItem: string, index: number) => (
                    <span key={index}>{genreItem}</span>
                  ))}
                </div>
                <p className={style.summary}>{summary}</p>
              </div>
              <div className={style.btnsContainer}>
                <Button type="button" size="small" onClick={onPlayVideo}>
                  Play Trailer
                </Button>
                <Button
                  type="button"
                  size="small"
                  onClick={handleAddToFavorites}
                  disabled={userId ? false : true}
                >
                  {movieInFavorites
                    ? "Remove from favorites"
                    : "Add to Favorites"}
                </Button>
              </div>
            </div>
            {playVideo && <VideoModal videoUrl={mockVideoUrl} />}
          </div>
          <MoviesList
            title="Similar Movies"
            genre={genre[0]}
            movieId={movieId || ""}
          />
        </>
      }
      {/* {error && <ErrorElement error={error} />}
            {isLoading && <LoadingSpinner />} */}
    </>
  );
};

export default MovieDetails;

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  // extracting movieId
  const { movieId } = ctx.query;

  // getting movie details
  const response = await axios.get(API.getMovieDetailsById(movieId as string));
  const { data } = response.data;

  return {
    props: {
      movieDetails: data[0],
    },
  };
};
