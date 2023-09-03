import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { API } from "../../constants/constants";
import { MovieCardProps } from "../../types/dataTypes";

interface UpdateMoviesByGenreListProps {
  title: string;
  newMovies: Array<MovieCardProps>;
}

interface MoviesByGenresProps {
  title: string;
  data: MovieCardProps[];
}

interface ContentState {
  moviesByGenre: MoviesByGenresProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  playVideo: boolean;
  favoriteMovies: MovieCardProps[];
}

const initialState: ContentState = {
  moviesByGenre: [],
  status: "idle",
  error: undefined,
  playVideo: false,
  favoriteMovies: [],
};

export const fetchMoviesByGenres = createAsyncThunk(
  "content/getMoviesByGenres",
  async (genresList: string[]) => {
    // subsequently calling API  with every genre name to get movies data by genre.
    const promises = genresList.map((genre) =>
      fetch(API.getMoviesByGenre(genre, 1, 15)).then((res) => res.json())
    );
    // awaiting for all promises to resolve, not going forward one by one
    const moviesData = await Promise.all(promises);

    let moviesByGenreData: MoviesByGenresProps;
    const moviesByGenreList: ContentState["moviesByGenre"] = [];
    moviesData.forEach((response, index) => {
      const genreName = genresList[index];
      moviesByGenreData = {
        title: genreName,
        data: response.data.data,
      };
      moviesByGenreList.push(moviesByGenreData);
    });

    const allMoviesResponse = await axios.get(API.getAllMovies(1, 15));
    if (allMoviesResponse.data) {
      const allMoviesData = allMoviesResponse.data.data.data;
      moviesByGenreList.unshift({ title: "All Movies", data: allMoviesData });
    }

    return moviesByGenreList;
  }
);

export const fetchFavoriteMovies = createAsyncThunk(
  "content/getUserFavoriteMovies",
  async (userId: string) => {
    const response = await axios.get(API.userDataEndpoint(userId));
    const data = response.data;
    const favoriteMovies = data?.data.favoriteMovies;

    return favoriteMovies;
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<MovieCardProps>) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<MovieCardProps>) => {
      state.favoriteMovies = state.favoriteMovies.filter((movie) => {
        return movie.id !== action.payload.id;
      });
    },
    setUserFavorites: (state, action: PayloadAction<MovieCardProps[]>) => {
      state.favoriteMovies = action.payload;
    },
    updateMoviesByGenreList: (
      state,
      action: PayloadAction<UpdateMoviesByGenreListProps>
    ) => {
      const { title, newMovies } = action.payload;
      // Finding the index of the genre title
      const genreIndex: number = state.moviesByGenre.findIndex(
        (genre: { title: string }) => genre.title === title
      );

      // If the genre title exists, update data
      if (genreIndex !== -1) {
        state.moviesByGenre[genreIndex].data = [
          ...state.moviesByGenre[genreIndex].data,
          ...newMovies,
        ];
      }
    },
    setPlayVideo: (state, action) => {
      state.playVideo = !state.playVideo;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMoviesByGenres.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesByGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.moviesByGenre = action.payload;
      })
      .addCase(fetchMoviesByGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFavoriteMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favoriteMovies = action.payload;
      })
      .addCase(fetchFavoriteMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export selectors
export const selectContentFavoriteMovies = (state: RootState) =>
  state.content.favoriteMovies;
export const selectContentMoviesByGenre = (state: RootState) =>
  state.content.moviesByGenre;
export const selectContentStatus = (state: RootState) => state.content.status;
export const selectContentError = (state: RootState) => state.content.error;
export const selectPlayVideo = (state: RootState) => state.content.playVideo;

// export actions
export const {
  addToFavorites,
  removeFromFavorites,
  setUserFavorites,
  updateMoviesByGenreList,
  setPlayVideo,
} = contentSlice.actions;

// export reducer
export default contentSlice.reducer;
