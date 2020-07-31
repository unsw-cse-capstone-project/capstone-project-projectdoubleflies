import { FETCH_RECIPES, NEW_RECIPES, GET_RECIPE, DELETE_RECIPE, GIVE_RECOMMENDATION, FETCH_USER_RECIPES, GET_USER_RECIPE, EDIT_RECIPE, SEARCH_RECIPE, GET_IMAGE, SET_INGREDIENTS} from './types';
import axios from 'axios';

const apiUrl="http://localhost:8080";

export const fetchRecipes = (offset) => dispatch => {
	axios.get(`${apiUrl}/recipe?offset=${offset}`)
	.then(response => dispatch({
		type: FETCH_RECIPES,
		payload: response.data
	})).catch(err=> alert("Can not get recipe information"))
}

export const fetchUserRecipes = (username) => dispatch => {
	axios.get(`${apiUrl}/recipe/find?username=${username}`)
	.then(response => dispatch({
		type: FETCH_USER_RECIPES,
		payload: response.data
	})).catch(err=> alert("Can not get your recipe information"))
}

export const createRecipe = (username, postData, image) => dispatch => {
	axios.post(`${apiUrl}/uploadFile`, image,{
		headers: {
		  'Content-Type': 'multipart/form-data'
		}
	}).then(res=>{
		const data = res.data.split('/')
		const imageID=data[data.length-1]
		axios.post(`${apiUrl}/recipe/${username}/${imageID}`, postData)
    	.then(response=>{
			dispatch({
				type: NEW_RECIPES,
				payload: response.status
			})
		}).catch(error=>{
			axios.delete(`${apiUrl}/image/delete/${imageID}`)
			.then(r=>{
				alert("Can not submit")
			}).catch(error=>{
				alert("something wrong")
			})
		})
	}).catch(error=>{
		alert("Cannot submit image")
	})
	
}
export const getRecipe = (id) => dispatch => {
	axios.get(`${apiUrl}/recipe/${id}`)
	.then(response => dispatch({
		type: GET_RECIPE,
		payload: response.data
	}))
}

export const getUserRecipe = (id) => dispatch => {
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
}

export const editRecipe = (id, postData, image) => dispatch => {
	axios.post(`${apiUrl}/uploadFile`, image,{
		headers: {
		  'Content-Type': 'multipart/form-data'
		}
	}).then(res=>{
		const data = res.data.split('/')
		const imageID=data[data.length-1]
		axios.post(`${apiUrl}/${id}/imagechange/${imageID}`,{
			headers: {
			  'Content-Type': 'multipart/form-data'
			}
		}).then(res=>{
			axios.put(`${apiUrl}/recipe/${id}`, postData)
			.then(response=>{
				dispatch({
					type: EDIT_RECIPE,
					payload: response.status
				})
			}).catch(error=>{
				// axios.delete(`${apiUrl}/image/delete/${imageID}`)
				// .then(r=>{
				// 	alert("Can not submit")
				// }).catch(error=>{
				// 	alert("something wrong")
				// })
			})
		}).catch(error=>{
			alert("Cannot submit image")
		})
	})
	
}
export const deleteRecipe = (id) => dispatch => {
	axios.delete(`${apiUrl}/recipe/${id}`)
	.then(response => {
		dispatch({
			type: DELETE_RECIPE, 
			payload: id,
			status: response.status
		})
	})
	.catch(error=>{
		if(error.response.status===500){
			alert("Can not submit")
		}
	})
}

export const searchRecipes = (ingredients, type) => dispatch => {
	let obj=undefined;
	obj={"ingredients": ingredients, "type": type}
	const strJson=JSON.stringify(obj)
	localStorage.setItem("search", strJson)

	if(type==="")
		type=undefined
	
	obj={"ingredients": ingredients, "type": type}
	axios.post(`${apiUrl}/search`, obj)
	.then(response=>{
		dispatch({
			type: SEARCH_RECIPE, 
			payload: response.data
		})
	})
	
}

export const getImage = (id) => dispatch => {
	axios.get(`${apiUrl}/recipe/image/${id}`)
	.then(response => {
		dispatch({
			type: GET_IMAGE,
			payload: response.data
		})
	})
}

export const searchIng = ()=>dispatch => {
	axios.get(`${apiUrl}/search/popularNoMatch`)
	.then(response=> {
		dispatch({
			type: SET_INGREDIENTS,
			payload: response.data
		})
	})
}
