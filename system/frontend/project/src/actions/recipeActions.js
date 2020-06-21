import { FETCH_RECIPES, NEW_RECIPES, GET_RECIPE, DELETE_RECIPE, GIVE_RECOMMENDATION, FETCH_USER_RECIPES, GET_USER_RECIPE, EDIT_RECIPE} from './types';
import axios from 'axios';

const apiUrl="http://localhost:8080";

export const fetchRecipes = () => dispatch => {
	// console.log("fetching")
	// const jstring = [{
	// 	"recipeID": 5,
	// 	"ingredients": [
	// 		{
	// 			"ingredient": "egg",
	// 			"category": "dairy",
	// 			"amount": "1"
	// 		}
	// 	],
	// 	"instructions": [
	// 		"pan fry"
	// 	],
	// 	"user": {
	// 		"password": "first",
	// 		"id": "first",
	// 		"recipe": null
	// 	},
	// 	"title": "First",
	// 	"description": "egg",
	// 	"type": "Breakfast"
	// }]
	// dispatch({
	// 	type: FETCH_RECIPES,
	// 	payload: jstring
	// })
	axios.get(`${apiUrl}/recipe`)
	.then(response => dispatch({
		type: FETCH_RECIPES,
		payload: response.data
	})).catch(err=> console.log(err))
}

export const fetchUserRecipes = (username) => dispatch => {
	const jstring = [{
		"recipeID": 4,
		"ingredients": [
			{
				"ingredient": "egg",
				"category": "dairy",
				"amount": "1"
			}
		],
		"instructions": [
			"pan fry"
		],
		"user": {
			"password": "first",
			"id": "first",
			"recipe": null
		},
		"title": "First",
		"description": "egg",
		"type": "Breakfast"
	},
	{
		"recipeID": 5,
		"ingredients": [
			{
				"ingredient": "egg",
				"category": "dairy",
				"amount": "1"
			}
		],
		"instructions": [
			"pan fry"
		],
		"user": {
			"password": "first",
			"id": "first",
			"recipe": null
		},
		"title": "First",
		"description": "egg",
		"type": "Breakfast"
	},
	{
		"recipeID": 6,
		"ingredients": [
			{
				"ingredient": "tomato",
				"category": "vegetable",
				"amount": "1"
			}
		],
		"instructions": [
			"wash"
		],
		"user": {
			"password": "first",
			"id": "first",
			"recipe": null
		},
		"title": "Second",
		"description": "hi",
		"type": "Breakfast"
	}]
	dispatch({
		type: FETCH_USER_RECIPES,
		payload: jstring
	})
}

export const createRecipe = (postData) => dispatch => {
	// const jstring=JSON.stringify(postData)
	console.log(postData)
	axios.post(`${apiUrl}/recipe/`, postData)
    .then(response=>{
		dispatch({
			type: NEW_RECIPES,
			payload: response.data
		})
	})
	.catch(error=>{
		if(error.response!=null){
			if(error.response.status===500){
			alert("Can not submit")
			}
		}
    })
}

export const getRecipe = (id) => dispatch => {
	dispatch({
		type: GET_RECIPE,
		payload: id
	})
}

export const getUserRecipe = (id) => dispatch => {
	dispatch({
		type: GET_USER_RECIPE,
		payload: id
	})
}

export const giveRecommendation = (itngredient) => dispatch => {
	// axios.get(`${apiUrl}/recipe/${ingredient}`)
	// .then(response => {
	// 	dispatch({
	// 		type: GIVE_RECOMMENDATION,
	// 		payload: response.data
	// 	})
	// })
	dispatch({
		type:GIVE_RECOMMENDATION,
		payload: "test"
	})
}

export const editRecipe = (postData) => dispatch => {
	axios.put(`${apiUrl}/recipe`, postData)
	.then(response=>{
		dispatch({
			type: EDIT_RECIPE,
			payload: response.data
		})
	})
	// dispatch({
	// 	type: EDIT_RECIPE,
	// 	payload: "editing"
	// })
}

export const deleteRecipe = (id) => dispatch => {
	// axios.delete(`${apiUrl}/recipe/${id}`)
	// .then(response => {
	// 	dispatch({
	// 		type: DELETE_RECIPE, 
	// 		payload: response.data
	// 	})
	// })
	// .catch(error=>{
	// 	if(error.response.status===500){
	// 		alert("Can not submit")
	// 	}
	// })
	dispatch({
		type: DELETE_RECIPE, 
		payload: id
	})
	
}