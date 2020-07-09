import React, { Component } from 'react'
// import Card from '../layouts/Card'
// import axios from "axios";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLoggedIn } from '../actions/userActions';
import {setIng} from '../actions/recipeActions'
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
		if(this.props.location.state===true){
			
			return(
				alert("Recipe Saved")
			)	
		}
		this.setState({
			success:false
		})
	}

	onSearch=(e)=>{
		e.preventDefault();
		this.props.setIng();
	}

	render(){
		return (
			<div className="container">
				<div className="ui placeholder segment">
					<div className="ui icon header">
						<i className="search icon"></i>
						Find Frequently Searched Set of Ingredients
					</div>
					<div className="inline">
						<div className="ui primary button" onClick={e=>this.onSearch(e)}>Search</div>
					</div>
					{this.props.set_ing!==undefined&&
					<div className="inline">
						{Object.keys(this.props.set_ing).map(key=>{
							return(
								this.props.set_ing[key].map(elem=>{
									return(
										<p>{elem}</p>
									)
								})
							)
						})}
					</div>
					}
				</div>
				<h4>My Recipes</h4>
				<Link to={{ pathname: "/post"}}>
					<button className="m-2 btn btn-primary" type="button">Create Recipe</button>
				</Link>
				
				<ListRecipe/>
				{!this.props.loggedIn && <Redirect to="/"/>}
			</div>
			
		)
	}
}
const mapStateToProps = state => ({
	loggedIn: state.users.loggedIn,
	set_ing: state.recipes.set_ing

});

export default connect(mapStateToProps, {checkLoggedIn,setIng})(ContributorPage);