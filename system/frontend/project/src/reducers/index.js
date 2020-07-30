import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import userReducer from './userReducer';
import explorerReducer from './explorerReducer';

export default combineReducers({
	recipes: recipeReducer,
	users: userReducer,
	explorers: explorerReducer
});



