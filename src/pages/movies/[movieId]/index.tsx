import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";

import Button from "../../../app/components/Button/Button";
import VideoModal from "../../../app/components/VideoModal/VideoModal";
import style from "./MovieDetails.module.scss";
import { API } from "../../../app/constants/web_constants/appConstants";

import {
  addToFavorites,
  removeFromFavorites,
  selectContentFavoriteMovies,
  selectPlayVideo,
  setPlayVideo,
} from "../../../app/state/content/contentSlice";
import { MovieCardProps } from "../../../app/constants/web_constants/types";
import MoviesList from "../../../app/components/MoviesList/MoviesList";
import { selectUserId } from "../../../app/state/auth/authSlice";
import axios from "axios";
import { useRouter } from "next/router";

const mockVideoUrl =
  "https://imdb-video.media-imdb.com/vi1816511513/1434659607842-pgv4ql-1685659017307.mp4?Expires=1694645055&Signature=RNJe5-enXbiuAiOVO0srtBMl4peRgPLYCIiyKG~Ry3-Ov8bqMgpKtamn-kVga9XuruCvaIqxY3udJWcZAakl4mtJxlI6Cve7vV1Lg1ojzUsMpm0cJVHhcTt0mxyzdEle~uuEMyeaxj49HiyVuI1to5IUbJgMemp7-KEa~EaVNof~oZnoLec9fxq6ZmVMZkYVDKhuFEuXjzQ2w7PgY8EMH5yv1ptuKkxmd7oVPS5GjoyHGo92-2iGZRLSqwnGk9RsvfYsFhJ8F75F~yCJFPvALUMcWbSkIaSgvN58Eg0kgJ-TMzTUelfmRB4aU6AQg1UYwLEORv9dMrVtSyAnaN~ghA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA";

const MovieDetails = () => {
  const [movieData, setMovieData] = useState<any>();

  const dispatch = useDispatch();
  const playVideo = useSelector(selectPlayVideo);
  const favorites = useSelector(selectContentFavoriteMovies);
  const userId = useSelector(selectUserId);

  const router = useRouter();
  const movieId = Array.isArray(router.query.movieId)
    ? router.query.movieId[0]
    : router.query.movieId || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API.getMovieDetailsById(movieId as string)
        );
        const { data } = response.data;

        setMovieData(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  if (!movieData) {
    return;
  }

  const { genre, duration, posterUrl, rating, summary, title, videoUrl, year } =
    movieData;

  // const movieInFavorites = favorites.includes(movieId!);
  const movieInFavorites = false;

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
      {movieData && (
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
      )}
    </>
  );
};

export default MovieDetails;
