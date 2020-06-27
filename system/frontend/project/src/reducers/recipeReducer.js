import { FETCH_RECIPES, NEW_RECIPES, GET_RECIPE, DELETE_RECIPE, GIVE_RECOMMENDATION, FETCH_USER_RECIPES, GET_USER_RECIPE, EDIT_RECIPE, SEARCH_RECIPE} from '../actions/types';

const initialState = {
	items:[],
	item: {},
	category: "",
	user_items: [],
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
			console.log(action.payload)
			return {
				...state,
				user_items: action.payload
			}

		case NEW_RECIPES:
			return {
				...state,
				item: action.payload
			}

		case GET_RECIPE:
			console.log("get recipe", action.payload)
			console.log(state.items)
			const selected = filterById(state.items, action.payload)
			console.log(selected)
			return {
				...state, 
				item: state.items[0]
			}

		case GET_USER_RECIPE:
			const sel = filterById(state.user_items, action.payload)
			return {
				...state,
				user_item: sel
			}
		case GIVE_RECOMMENDATION:
			return {
				...state,
				category: action.payload
			}
		case EDIT_RECIPE:
			return {
				...state,
				// user_item: edit

			}
		case DELETE_RECIPE:
			var array = state.user_items.filter((item)=>{return(item['recipeID']!==action.payload)})
			return {
				...state, 
				user_items:  array
			}

		case SEARCH_RECIPE:
			console.log("search")
			return {
				...state,
				items: action.payload
			}

		default:
			return state;
	}
}