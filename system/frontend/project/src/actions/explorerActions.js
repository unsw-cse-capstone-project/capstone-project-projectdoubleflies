import { FETCH_INGREDIENTS, PICK_INGREDIENT, FETCH_USER_FAVOURITES,  ADD_FAVOURITE, REMOVE_FAVOURITE} from './types'

const apiUrl = "http://localhost:8080";

export const fetchIngredients=()=> dispatch=>{

	const data = [
		{
            "ingredient": "egg",
            "category": "dairy",
            "amount": "1"
		},
		{
            "ingredient": "tomato",
            "category": "vegetable",
            "amount": "1"
		},
		{
            "ingredient": "milk",
            "category": "dairy",
            "amount": "1"
        }
	]
	dispatch({
		type: FETCH_INGREDIENTS,
		payload: data

	})

}

export const pickIngredient = (ingredient)=>dispatch => {
	dispatch({
		type: PICK_INGREDIENT,
		payload: ingredient
	})
}

export const fetchUserFavourite = (username)=>dispatch=>{
	// axios.get(`${apiUrl}/favourite/`)
	// .then(response => {
	// 	dispatch({
	// 		type: FETCH_USER_FAVOURITE,
	// 		payload: response.data
	// 	})
	// })
	const data = [
		{
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
			"title": "First",
			"description": "egg",
			"type": "Breakfast"
		}
	]
	dispatch({
		type: FETCH_USER_FAVOURITES,
		payload: data
	})
}

export const addFavourite = (username, id)=> dispatch => {
	// axios.get(`${apiUrl}/recipe/${id}`)
	// .then(response => {
	// 	dispatch({
	// 		type: ADD_FAVOURITE, 
	// 		payload: response.data
	// 	})
	// })

	const data = 
		{
			"recipeID": 10,
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
			"title": "First",
			"description": "egg",
			"type": "Breakfast"
		}
	

	dispatch({
		type: ADD_FAVOURITE, 
		payload: data
	})
}

export const removeFavourite = (id) => dispatch => {
	dispatch({
		type: REMOVE_FAVOURITE,
		payload: id
	})
}
