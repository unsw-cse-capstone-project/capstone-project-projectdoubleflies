import { FETCH_INGREDIENTS, PICK_INGREDIENT, FETCH_USER_FAVOURITES,  ADD_FAVOURITE, REMOVE_FAVOURITE, SUGGEST_INGREDIENTS} from './types'
import axios from 'axios';

const apiUrl = "http://localhost:8080";

export const fetchIngredients=()=> dispatch=>{

	// const data = {Dairy: ["milk", "egg"], Vegetables:["tomato"], "Baking & Grains": ["bread"], Spices:["tomato"], Meats: ["bread"],Fish:["tomato"], "Baking & Grains": ["bread"], Seafood:["tomato"], "Baking & Grains": ["bread"],  Sauces:["tomato"], Legumes: ["bread"], Beverages:["b"], Nuts:["nuts"], Alcohol:[], Condiments:[], Oils:[]}
	// dispatch({
	// 	type: FETCH_INGREDIENTS,
	// 	payload: data
	// })
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
	console.log(`${apiUrl}/favorite/${username}`)
	axios.get(`${apiUrl}/favorite/${username}`)
	.then(response => {
		console.log("fetch user favourite")
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
		// console.log(response)
		dispatch({
			type: REMOVE_FAVOURITE, 
			payload: id,
			status: response.status
		})
	})
}

export const suggestIngredients = (ingredients) => dispatch => {
	console.log("suggestIngredients")
	console.log(ingredients)
	axios.post(`${apiUrl}/suggest/ingredient`, ingredients)
	.then(response => {
		console.log(response.data)
		dispatch({
			type: SUGGEST_INGREDIENTS,
			payload: response.data
		})
	})
}

