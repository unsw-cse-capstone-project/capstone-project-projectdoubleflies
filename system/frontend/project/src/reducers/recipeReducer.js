import { FETCH_RECIPES, NEW_RECIPES, GET_RECIPE, DELETE_RECIPE, GIVE_RECOMMENDATION, FETCH_USER_RECIPES, GET_USER_RECIPE, EDIT_RECIPE, SEARCH_RECIPE, GET_IMAGE} from '../actions/types';

const initialState = {
	items:[],
	item: {},
	category: "",
	user_items: [],
	success: false,
	deleted: false,
	posted: false,
	saved: false,
	image: {}
}


export default function(state = initialState, action) {
	const filterById = (jsonObject, id) => {
		return jsonObject.filter(
			(jsonObject)=>{return (jsonObject['recipeID'] === id);
		})[0];
	}
	switch(action.type){
		case FETCH_RECIPES:

			return {
				...state, 
				items: action.payload
			}

		case FETCH_USER_RECIPES:
			return {
				...state,
				user_items: action.payload,
				success: false,
				saved: false,
				deleted: false, 
				posted: false,
			}

		case NEW_RECIPES:
			let temp=false
			if(action.payload===200)
				alert("This recipe was successfully posted.")
				temp=true
			return {
				...state,
				success: temp,
				posted: true,
				saved: false
			}

		case GET_RECIPE:
			return {
				...state, 
				item: action.payload,
				deleted: false,
				posted: false,
				saved: false
			}

		case GET_USER_RECIPE:
			console.log(action.payload)
			return {
				...state,
				user_item: action.payload,
				deleted: false,
				posted: false,
				saved: false
			}
		case GIVE_RECOMMENDATION:
			return {
				...state,
				category: action.payload
			}
		case EDIT_RECIPE:
			if(action.payload===200)
				alert("This recipe was successfully edited.")
			return {
				...state,
				saved: true
			}
		case DELETE_RECIPE:
			var array = state.user_items.filter((item)=>{return(item['recipeID']!==action.payload)})
			return {
				...state, 
				user_items:  array,
				deleted: true
			}

		case SEARCH_RECIPE:
			console.log("search")
			console.log(action.payload)
			return {
				...state,
				items: action.payload
			}
		
		case GET_IMAGE:
			return {
				...state,
				image: action.payload
			}

		default:
			return state;
	}
}