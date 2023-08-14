export const GlobalStyles = {
  colors: {
    primary: '#D06027',
    primaryLight: '#DA8D65',
    mainBackground: '#1F1C2C',
    mainText: '#FFFFFF',
    greyText: '#A5A5A5',
  },
};

// API endpoints
// const API_DOMAIN = 'http://localhost:9000';
const API_DOMAIN = 'http://10.0.2.2:9000';

export const API = {
  getAllMovies: (page: number = 1, limit: number = 15) =>
    `${API_DOMAIN}/allMovies?page=${page}&limit=${limit}`,
  getGenresList: `${API_DOMAIN}/genresList`,
  getMoviesByGenre: (genreName: string, page: number = 1, limit: number = 15) =>
    `${API_DOMAIN}/moviesByGenre/${genreName}?page=${page}&limit=${limit}`,
  getMovieDetailsById: (movieId: string) => `${API_DOMAIN}/movie/${movieId}`,
  createUserInDatabase: `${API_DOMAIN}/user/signup`,
  userDataEndpoint: (userId: string) => `${API_DOMAIN}/user/${userId}`,
};
