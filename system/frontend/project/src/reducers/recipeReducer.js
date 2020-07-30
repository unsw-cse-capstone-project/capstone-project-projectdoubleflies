import { FETCH_RECIPES, NEW_RECIPES, GET_RECIPE, DELETE_RECIPE, GIVE_RECOMMENDATION, FETCH_USER_RECIPES, GET_USER_RECIPE, EDIT_RECIPE, SEARCH_RECIPE, GET_IMAGE, SET_INGREDIENTS} from '../actions/types';

const initialState = {
	items:[],
	item: {},
	category: "",
	user_items: [],
	success: false,
	deleted: false,
	posted: false,
	saved: false,
	image: {},
	set_ing: undefined,
	offset:[]
}


export default function(state = initialState, action) {
	let arr
	let new_arr
	switch(action.type){
		case FETCH_RECIPES:
			arr=[...state.items]
			new_arr=arr.concat(action.payload)
			return {
				...state, 
				items: new_arr,
				set_ing: undefined,
				offset: action.payload
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
				saved: false,
			}

		case GET_USER_RECIPE:
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
			if(action.status===200)
				alert("This post was successfully deleted")
			return {
				...state, 
				user_items:  array,
				deleted: true
			}

		case SEARCH_RECIPE:
			return {
				...state,
				items: action.payload,
				set_ing:undefined
			}
		
		case GET_IMAGE:
			return {
				...state,
				image: action.payload
			}

		case SET_INGREDIENTS:
			return {
				...state,
				set_ing: action.payload
			}
		default:
			return state;
	}
}