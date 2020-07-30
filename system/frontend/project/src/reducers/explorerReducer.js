import { FETCH_INGREDIENTS, PICK_INGREDIENT, ADD_FAVOURITE, FETCH_USER_FAVOURITES, REMOVE_FAVOURITE, SUGGEST_INGREDIENTS } from '../actions/types';

const initialState ={
	ingredients: {},
	favs:[],
	picked: [],
	suggestions: "",
}
export default function(state=initialState, action){
	switch (action.type){
		case FETCH_INGREDIENTS:
			return{
				...state,
				ingredients: action.payload
			}
		
		case PICK_INGREDIENT:
			const array = [...state.picked]
			array.push(action.payload)
			return {
				...state, 
				picked: array
			}

		case ADD_FAVOURITE:
			if(action.payload===false)
				alert("You can not add your recipe to your favourites")
			else if(action.status===200)
				alert("Added to My Favourite")
			return {
				...state,
			}

		case REMOVE_FAVOURITE:
			let temp = [...state.favs]
			temp = temp.filter(item=>item['recipeID']!==action.payload)
			if(action.status===200)
				alert("Removed from My Favourite")
			return {
				...state, 
				favs: temp
			}

		case FETCH_USER_FAVOURITES:
			return {
				...state, 
				favs: action.payload
			}
		
		case SUGGEST_INGREDIENTS:
			return {
				...state,
				suggestions: action.payload
			}
		default:
			return state
	}
}