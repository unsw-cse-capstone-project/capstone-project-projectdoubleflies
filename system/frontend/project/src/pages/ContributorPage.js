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

class ContributorPage extends Component {

	constructor(props) {
		super(props)
		this.state={
			success: false
		}
	}
	componentDidMount() {
		this.props.checkLoggedIn();
		// // TODO 
		if(this.props.location.state===true){
			
			return(
				alert("Recipe Saved")
			)	
		}
		this.setState({
			success:false
		})
	}
	render(){
		return (
			<div className="container">
				<Link to={{ pathname: "/post"}}>
					<button className="m-2 btn btn-primary" type="button">Create Recipe</button>
				</Link>
				<h4>My Recipes Page</h4>
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