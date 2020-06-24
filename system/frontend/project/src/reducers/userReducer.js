import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, CHECK_USERNAME, CHECK_LOGGEDIN, GET_LOGGEDIN } from '../actions/types';
import { bindActionCreators } from 'redux';

const initialState = {
	user: {},
	valid: false,
	registered: false,
	loggedIn: false,
	logged: false, 
}


export default function(state = initialState, action) {
	switch(action.type){
		case LOGIN_USER:
			console.log('reducer login')
			// console.log(action.payload)
			if(action.validated){
				const user = {username: action.username}
 				localStorage.setItem('username', JSON.stringify(user));
			}
			return {
				...state, 
				logged:action.validated
			}
		case REGISTER_USER:
			console.log('reducer register')
			console.log(action.validated)
			if(action.validated){
				const user = {username: action.username}
				localStorage.setItem('username', JSON.stringify(user));
				const temp= JSON.parse(localStorage.getItem('username'));
				console.log(`temp ${JSON.stringify(temp)}`)
			}
			return {
				...state,
				registered: action.validated
			}

		case CHECK_USERNAME:
			console.log("hi")
			console.log(action.payload)
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