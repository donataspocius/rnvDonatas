import thunk from 'redux-thunk';
import databaseStorage from './databaseStorage';

const middlewares = [thunk, databaseStorage];

export default middlewares;
