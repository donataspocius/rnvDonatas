import {AnyAction, Dispatch, MiddlewareAPI} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES} from '../content/contentTypes';
import {updateUserFavorites} from '../../utils/functions';

const databaseStorage =
  ({getState}: MiddlewareAPI) =>
  (next: Dispatch) =>
  (action: AnyAction) => {
    next(action);
    let currentState = getState();

    const userId = (state: RootState) => {
      return state.auth.userId;
    };
    const currUserId = userId(currentState);

    switch (action.type) {
      case ADD_TO_FAVORITES:
        updateUserFavorites(action.payload, currUserId, 'add');
        break;
      case REMOVE_FROM_FAVORITES:
        updateUserFavorites(action.payload, currUserId, 'remove');
        break;
      default:
        break;
    }
  };

export default databaseStorage;
