import { useRouter } from "next/router";
import Image from "next/image";

import { useSelector } from "react-redux";
import { BsFillSuitHeartFill } from "react-icons/bs";

import { MovieCardProps } from "../../constants/web_constants/types";
import style from "./MovieCard.module.scss";
import { selectContentFavoriteMovies } from "../../state/content/contentSlice";

const MovieCard = ({ id, title, posterUrl }: MovieCardProps) => {
  const router = useRouter();

  const favorites = useSelector(selectContentFavoriteMovies);
  //   const movieInFavorites = favorites.includes(id);
  const movieInFavorites = false;

  // onClick navigate to movieDetails
  const onClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <div className={style.movieCardContainer} onClick={onClick}>
      {movieInFavorites && (
        <BsFillSuitHeartFill color="#d06027" size={39} className={style.icon} />
      )}
      <Image
        className={style.movieCardImg}
        src={posterUrl}
        alt={`movie ${title} poster`}
        width="200"
        height="300"
      />
      <h3 className={style.movieCardTitle}>{title}</h3>
    </div>
  );
};

export default MovieCard;
