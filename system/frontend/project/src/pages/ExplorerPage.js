import React, { Component } from 'react'
import ListRecipe from './ListRecipe'
import { FAVOURITE } from '../helpers/type'
import { connect } from 'react-redux';
import { checkLoggedIn } from '../actions/userActions'
import { Redirect } from 'react-router-dom';

class ExplorerPage extends Component {
	render() {
		
		return (
			<>
			{this.props.loggedIn && <ListRecipe/>}
			{!this.props.loggedIn && <Redirect to="/"/>}
			</>
		)
	}
}

const mapStateToProps = state =>({
	loggedIn: state.users.loggedIn
})
	
export default connect(mapStateToProps, {checkLoggedIn})(ExplorerPage)