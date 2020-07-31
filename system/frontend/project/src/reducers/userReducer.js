import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, CHECK_USERNAME, CHECK_LOGGEDIN} from '../actions/types';

const initialState = {
	user: {},
	valid: false,
	registered: false,
	loggedIn: false,
	logged: false, 
	username: ""
}


export default function(state = initialState, action) {
	switch(action.type){
		case LOGIN_USER:
			if(action.payload){
				const user = {username: action.username}
				 localStorage.setItem('username', JSON.stringify(user));
				 return {
					...state, 
					logged:action.payload
				}
			}else{
				alert("Not valid Username or Password")
			}
			return state

		case REGISTER_USER:
			if(action.payload===true){
				const user = {username: action.username}
				localStorage.setItem('username', JSON.stringify(user));
				return {
					...state,
					registered: action.payload
				}
			}else{
				alert("Username already exists")
			}
			return state

		case CHECK_USERNAME:
			return {
				...state,
				valid:action.payload
			}

		case CHECK_LOGGEDIN:
			return {
				...state, 
				loggedIn: action.payload,
				username: action.username
			}

		case LOGOUT_USER:
			return {
				...state,
				loggedIn: false,
				logged: false, 
				registered: false
			}
		default:
			return state;
	}
	
}
