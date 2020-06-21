import React, { Component } from 'react'
// import Card from '../layouts/Card'
// import axios from "axios";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLoggedIn } from '../actions/userActions';
import { Redirect } from 'react-router'
import ListRecipe from './ListRecipe'
import { PRIVATE } from '../helpers/type';

// class ContributorPage extends Component {

// 	componentDidMount() {
// 		console.log('hi')
// 		this.props.checkLoggedIn();
// 		console.log(this.props.loggedIn)
// 		if(this.props.loggedIn===true){
// 			console.log("logged in")
// 			console.log(this.props.username)
// 			this.props.fetchUserRecipes(this.props.username);
// 		}else{
// 			alert("Please Log In")
// 		}
// 	}

// 	onClick = (recipeID) =>{
// 		this.props.getRecipe(recipeID);
// 	}
// 	render() {
// 		console.log(this.props)
// 		const cards = this.props.recipes.map((item, id) => (
			
// 				<div className="card m-2" style={{width: 18 + 'em'}}>
// 					<div className="card-body">
// 						<h5 className="card-title">{item.title}</h5>
// 						<p className="card-text">{item.description}</p>
// 						<Link className="card-link" to={{ pathname: `/view/${item.recipeID}`}} onClick={this.onClick(item.recipeID)}>
// 							Check this out
// 						</Link>
// 					</div>
// 				</div>
		
// 		))
// 		return (
// 			<div className="container">	
// 			<Grid container direction="row" justify="center" alignItems="center">
// 				{this.props.loggedIn && cards}
// 			</Grid>
// 				{!this.props.loggedIn && <Redirect to="/" />}
// 			</div>
// 		)
// 	}
// }

// ContributorPage.propTypes = {
// 	fetchUserRecipe: PropTypes.func.isRequired,
// 	recipes: PropTypes.array.isRequired
// }
// const mapStateToProps = state => ({
// 	recipes: state.recipes.user_items,
// 	username: state.users.username,
// 	loggedIn: state.users.loggedIn
// });

// export default connect(mapStateToProps, {fetchUserRecipes, getRecipe, checkLoggedIn})(ContributorPage);

class ContributorPage extends Component {

	render(){
		this.props.checkLoggedIn();
		return (
			
			<div className="container">
				<Link to={{ pathname: "/post"}}>
					<button className="m-2 btn btn-primary" type="button">Add New Recipe</button>
				</Link>
				<ListRecipe/>
				{!this.props.loggedIn && <Redirect to="/"/>}
			</div>
			
		)
	}
}


const mapStateToProps = state => ({
	loggedIn: state.users.loggedIn
});

export default connect(mapStateToProps, {checkLoggedIn})(ContributorPage);