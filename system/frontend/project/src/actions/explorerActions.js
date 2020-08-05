import { FETCH_INGREDIENTS, PICK_INGREDIENT, FETCH_USER_FAVOURITES,  ADD_FAVOURITE, REMOVE_FAVOURITE, SUGGEST_INGREDIENTS} from './types'
import axios from 'axios';

const apiUrl = "http://localhost:8080";

export const fetchIngredients=()=> dispatch=>{
	axios.get(`${apiUrl}/search/ingredient`)
	.then(response => {
		dispatch({
			type: FETCH_INGREDIENTS,
			payload: response.data
		})
	})
}

export const pickIngredient = (ingredient)=>dispatch => {
	dispatch({
		type: PICK_INGREDIENT,
		payload: ingredient
	})
}

export const fetchUserFavourite = (username)=>dispatch=>{
	axios.get(`${apiUrl}/favorite/${username}`)
	.then(response => {
		dispatch({
			type: FETCH_USER_FAVOURITES,
			payload: response.data
		})
	})
}

export const addFavourite = (username, id)=> dispatch => {
	axios.get(`${apiUrl}/favorite/user?username=${username}&id=${id}`)
	.then(response => {
		dispatch({
			type: ADD_FAVOURITE, 
			payload: response.data,
			status: response.status
		})
	})
}

export const removeFavourite = (username, id) => dispatch => {
	axios.get(`${apiUrl}/favorite/${username}/delete?recipeName=${id}`)
	.then(response => {
		dispatch({
			type: REMOVE_FAVOURITE, 
			payload: id,
			status: response.status
		})
	})
}

export const suggestIngredients = (ingredients) => dispatch => {
	console.log(ingredients)
	axios.post(`${apiUrl}/suggest/ingredient`, ingredients)
	.then(response => {
		dispatch({
			type: SUGGEST_INGREDIENTS,
			payload: response.data
		})
	})
}

