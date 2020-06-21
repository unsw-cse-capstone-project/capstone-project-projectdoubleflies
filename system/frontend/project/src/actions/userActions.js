import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, CHECK_USERNAME, CHECK_LOGGEDIN, GET_LOGGEDIN} from './types';
import axios from 'axios';

const apiUrl="http://localhost:8080/";

export const loginUser = (username, password) => dispatch => {
	console.log("login")
	const user = {username: username}
 	localStorage.setItem('username', JSON.stringify(user));
	dispatch({
		type: LOGIN_USER,
		validated: true,
		username: username// replace with axios.get
	})
	// axios.post("http://localhost:8080/login", username, password)
	// .then(recipes => dispatch({
	// 	type: FETCH_RECIPES,
	// 	payload: recipes.data
	// })).catch(err=> console.log(err))
}

export const registerUser = (username, password) => dispatch => {
	console.log("register")
	const user = {username: username}
 	localStorage.setItem('username', JSON.stringify(user));
	dispatch({
		type: REGISTER_USER,
		validated: true,
		username: username// replace with axios.get
	})
	// const jstring=JSON.stringify(postData)
	// axios.post(`http://localhost:8080/recipe/${jstring}`)
    // .then(response=>{
	// 	dispatch({
	// 		type: NEW_RECIPES,
	// 		payload: response.data
	// 	})
	// })
	// .catch(error=>{
	// 	if(error.response!=null){
	// 		if(error.response.status===500){
	// 		alert("Can not submit")
	// 		}
	// 	}
    // })
}


export const checkUsername = (username)=>dispatch=>{
	console.log("check")
	dispatch({
		type: CHECK_USERNAME,
		payload: true // replace with axios.get
	})
}


export const checkLoggedIn = ()=> dispatch=>{
	console.log("check logged")
	// const user = localStorage.getItem('username');
	const user = JSON.parse(localStorage.getItem('username'))
	var username;
	// console.log(user.username)
	if(user!==null){
		username=user.username;
	}
	dispatch({
		type: CHECK_LOGGEDIN,
		payload: user===null ? false: true,
		username: username
	})
}

export const logoutUser = () => dispatch=>{
	localStorage.clear();
	dispatch({
		type: LOGOUT_USER,
		payload: false
	})
}


// export const getLoggedIn = () => dispatch => {
// 	dispatch({
// 		type: GET_LOGGEDIN,
// 		payload: JSON.parse(localStorage.getItem("username"))
// 	})
	