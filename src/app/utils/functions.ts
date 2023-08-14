import axios from 'axios';
import {API} from '../constants/constants';
import {MovieCardProps} from '../types/dataTypes';

// CREATE NEW USER IN DATABASE
export const createNewUserInDatabase = async (userId: string) => {
  const response = await axios.post(API.createUserInDatabase, {userId});
  return response;
};

export const updateUserFavorites = async (
  movieData: MovieCardProps,
  userId: string,
  type: 'add' | 'remove',
): Promise<any> => {
  try {
    const parameters = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // adding type parameter to body so the backend would now if this is add or remove
    const body = {
      movieData,
      type,
    };

    // sending data to update
    const result = await axios.put(
      API.userDataEndpoint(userId),
      body,
      parameters,
    );

    return result;
  } catch (error) {
    console.log('error updating user favorite movies -->', error);
  }
};

export const getUserFavoriteMovies = (userId: string) => {
  try {
    return axios.get(API.userDataEndpoint(userId));
  } catch (error) {
    console.log('error getting user favorite movies -->', error);
  }
};
