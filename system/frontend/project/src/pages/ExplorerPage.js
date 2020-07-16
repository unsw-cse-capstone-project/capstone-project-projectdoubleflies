import React, { Component } from 'react'
import ListRecipe from './ListRecipe'
import { FAVOURITE } from '../helpers/type'
import { connect } from 'react-redux';
import { checkLoggedIn } from '../actions/userActions'
import { Redirect } from 'react-router-dom'; 
import Background from '../new_background.jpg'


class ExplorerPage extends Component {
	render() {
		
		return (
			<div className="container pt-5">
			<img src={Background} alt="" className="bg"/>
			<h4>Favourite Recipes</h4>
			{this.props.loggedIn && <ListRecipe/>}
			{!this.props.loggedIn && <Redirect to="/"/>}
			</div>
		)
	}
}

const mapStateToProps = state =>({
	loggedIn: state.users.loggedIn
})
	
export default connect(mapStateToProps, {checkLoggedIn})(ExplorerPage)
