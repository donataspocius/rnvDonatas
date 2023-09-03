const API_DOMAIN = 'http://localhost:9000';

export const API = {
    getAllMovies: (page: number, limit: number) => `${API_DOMAIN}/allMovies?page=${page}&limit=${limit}`,
    getGenresList: `${API_DOMAIN}/genresList`,
    getMoviesByGenre: (genreName: string, page: number, limit: number) =>
        `${API_DOMAIN}/moviesByGenre/${genreName}?page=${page}&limit=${limit}`,
    getMovieDetailsById: (movieId: string) => `${API_DOMAIN}/movie/${movieId}`,
    createUserInDatabase: `${API_DOMAIN}/user/signup`,
    userDataEnpoint: (userId: string) => `${API_DOMAIN}/user/${userId}`,
};
