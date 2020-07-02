import { FETCH_RECIPES, NEW_RECIPES, GET_RECIPE, DELETE_RECIPE, GIVE_RECOMMENDATION, FETCH_USER_RECIPES, GET_USER_RECIPE, EDIT_RECIPE, SEARCH_RECIPE} from './types';
import axios from 'axios';

const apiUrl="http://localhost:8080";

export const fetchRecipes = () => dispatch => {
	axios.get(`${apiUrl}/recipe`)
	.then(response => dispatch({
		type: FETCH_RECIPES,
		payload: response.data
	})).catch(err=> console.log(err))
}

export const fetchUserRecipes = (username) => dispatch => {
	console.log("fetch user", username)
	axios.get(`${apiUrl}/recipe/find?username=${username}`)
	.then(response => dispatch({
		type: FETCH_USER_RECIPES,
		payload: response.data
	})).catch(err=> console.log(err))
}

export const createRecipe = (username, postData, image) => dispatch => {
	// const request = {
	// 	method: 'post',
	// 	url: `${apiUrl}/uploadFile`,
	// 	file: image,
	// }
	console.log(image.get('file'))
	axios.post(`${apiUrl}/uploadFile`, image,{
		headers: {
		  'Content-Type': 'multipart/form-data'
		}
	}).then(res=>{
		console.log(res.data)
		const data = res.data.split('/')
		const imageID=data[data.length-1]
		console.log(postData)
		axios.post(`${apiUrl}/recipe/${username}/${imageID}`, postData)
    	.then(response=>{
		// axios.post(`${apiUrl}/image/`, image)
		// .then(res=>{
		// 	dispatch({
		// 		type: NEW_RECIPES,
		// 		payload: response.status
		// 	})
		// })
		
			dispatch({
				type: NEW_RECIPES,
				payload: response.status
			})
		}).catch(error=>{
			alert("Can not submit")
			//TODO:
			// Delete submitted image
		})
	}).catch(error=>{
		alert("Cannot submit image")
	})
	
}
export const getRecipe = (id) => dispatch => {
	console.log(id)
	axios.get(`${apiUrl}/recipe/${id}`)
	.then(response => dispatch({
		type: GET_RECIPE,
		payload: response.data
	}))
}

export const getUserRecipe = (id) => dispatch => {
	console.log("id", id)
	axios.get(`${apiUrl}/recipe/${id}`)
	.then(response => dispatch({
		type: GET_USER_RECIPE,
		payload: response.data
	}))
}

export const giveRecommendation = (ingredient) => dispatch => {
	axios.get(`${apiUrl}/recipe/ingredient/${ingredient}`)
	.then(response => {
		dispatch({
			type: GIVE_RECOMMENDATION,
			payload: response.data
		})
	})
	// dispatch({
	// 	type:GIVE_RECOMMENDATION,
	// 	payload: "test"
	// })
}

export const editRecipe = (id, postData, image) => dispatch => {
	axios.put(`${apiUrl}/recipe/${id}`, postData)
	.then(response=>{
		// axios.post(`${apiUrl}/image/`, image)
		// .then(res=>{
		// 	dispatch({
		// 		type: NEW_RECIPES,
		// 		payload: response.status
		// 	})
		// })
		dispatch({
			type: EDIT_RECIPE,
			payload: response.data
		})
	}).catch(error=>{
		if(error.response.status===500){
			alert("Can not Save")
		}
	})
}

export const deleteRecipe = (id) => dispatch => {
	axios.delete(`${apiUrl}/recipe/${id}`)
	.then(response => {
		dispatch({
			type: DELETE_RECIPE, 
			payload: id
		})
	})
	.catch(error=>{
		if(error.response.status===500){
			alert("Can not submit")
		}
	})
}

export const searchRecipes = (ingredients) => dispatch => {
	console.log(ingredients)
	axios.post(`${apiUrl}/search`, ingredients)
	.then(response=>{
		dispatch({
			type: SEARCH_RECIPE, 
			payload: response.data
		})
	})
	
}