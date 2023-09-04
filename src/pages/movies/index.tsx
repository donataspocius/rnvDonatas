import { NextPage } from "next";
import { useState, useEffect } from "react";
import { API } from "../../app/constants/web_constants/appConstants";
import axios from "axios";
import {
  MovieCardProps,
  MovieDetailsProps,
} from "../../app/constants/web_constants/types";
import React from "react";
import LoadingSpinner from "../../app/components/LoadingSpinner/LoadingSpinner";
import ErrorElement from "../../app/components/ErrorElement/ErrorElement";
import Pagination from "../../app/components/Pagination/Pagination";
import style from "./Movies.module.scss";
import MovieCard from "../../app/components/MovieCard/MovieCard";
import useFetchData from "../../app/utils/customHooks";

interface BrowseProps {
  genresList: string[];
}

const Movies: NextPage<BrowseProps> = ({ genresList }) => {
  console.log("genre data in Component-->", ...genresList);
  const [genres, setGenres] = useState<MovieDetailsProps["genre"]>([
    "All Movies",
    ...genresList,
  ]);
  const [currentGenre, setCurrentGenre] = useState("All Movies");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);

  const handleGenreSelection = (e: React.MouseEvent) => {
    const genre = e.currentTarget.textContent;
    setCurrentGenre(genre || "");
  };

  const handleItemsPerPageChange = (selectedItemsPerPage: number) => {
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //     // getting movies data (allMovies or by genre)
  const APIendpoint =
    currentGenre === "All Movies"
      ? API.getAllMovies(currentPage, itemsPerPage)
      : API.getMoviesByGenre(currentGenre, currentPage, itemsPerPage);
  const { data, isLoading, error } = useFetchData(APIendpoint);

  const totalApiPages = data?.data.totalPages;
  const movieData = data?.data.data;

  // setting total pages
  useEffect(() => {
    setTotalPages(totalApiPages);
  }, [totalApiPages]);

  const genresElement = genres?.map((el, index) => {
    const isActive = el === currentGenre;
    return (
      <li
        key={index}
        onClick={handleGenreSelection}
        className={isActive ? style.active : ""}
      >
        {el}
      </li>
    );
  });

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
    <>
      {genres && <ul className={style.genresContainer}>{genresElement}</ul>}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorElement error={error} />}
      <div className={style.movieCardsContainer}>
        {data && !isLoading && !error && content}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default Movies;

export const getStaticProps = async () => {
  // getting API genres list
  const genresListResponse = await axios.get(API.getGenresList);
  const { data: genresList } = genresListResponse.data;
  console.log("genre data getStaticProps -->", genresList);

  return {
    props: {
      genresList: genresList,
    },
  };
};
