import React, { Component } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import {connect} from 'react-redux';
import { checkLoggedIn,  logoutUser} from '../actions/userActions';
import PropTypes from 'prop-types';
class Header extends Component {

	constructor(props) {
		super(props);
		this.state=({
			active: 1
		})
	}

	componentDidMount() {
		const path = window.location.href
		const temp = path.split('/')
		const check = temp[temp.length-1]
		switch(check){
			case "":
				this.setState({
					active: 1
				})
				break;

			case "explorer":
				this.setState({
					active:2
				})
				break;
			case "contributor":
				this.setState({
					active: 3
				})
				break;
			
			default:
				this.setState({
					active:0
				})
		}
	}
	
	handleLogout=()=>{
		this.props.logoutUser();
	}

	onClick = (e) =>(
		this.setState({
			active: e.target.id
		})
	)
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarToggler">
					<a className="navbar-brand" href="/">RecipeHub</a>
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
					<li className={`"nav-item "+${this.state.active===1?'active': null}`}>
						<a className="nav-link" href="/">Home</a>
					</li>
					{this.props.isLoggedIn && <li className={`"nav-item "+${this.state.active===2?'active': null}`}>
						<a className="nav-link" href="/explorer">My Favorites</a>
					</li>}
					
					{this.props.isLoggedIn && <li className={`"nav-item " + ${this.state.active===3?'active': null}`}>
						<a className="nav-link" href="/contributor">My Recipes</a>
					</li>}
					</ul>
					{this.props.isLoggedIn ? <>
						<a className="nav-link text-white">Welcome, {this.props.username}</a>
					<button type="button" className="btn btn-danger btn-margin" onClick={this.handleLogout}>Logout</button></> : <><LoginModal/><RegisterModal/></>}
				</div>
			</nav>
		)
	}
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps= state=>({
	isLoggedIn: state.users.loggedIn,
	username: state.users.username
})

export default connect(mapStateToProps, {checkLoggedIn, logoutUser})(Header)


