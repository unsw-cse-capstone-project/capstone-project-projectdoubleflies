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
		console.log(path)
		console.log(path)
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
		console.log("handle logout")
		this.props.logoutUser();
	}

	onClick = (e) =>(
		this.setState({
			active: e.target.id
		})
	)
	render() {
		console.log(this.props.isLoggedIn)
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarToggler">
				<a className="navbar-brand" href="/">Recipe Website</a>
				<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
				<li className={`"nav-item" + " " + ${this.state.active===1?'active': null}`}>
					<a className="nav-link" href="/">Home</a>
				</li>

				{this.props.isLoggedIn && <li className={`"nav-item" + " " + ${this.state.active===2?'active': null}`}>
					<a className="nav-link" href="/explorer">Explorer</a>
				</li>}
				
				{this.props.isLoggedIn && <li className={`"nav-item" + " " + ${this.state.active===3?'active': null}`}>
					<a className="nav-link" href="/contributor">Contributor</a>
				</li>}

				
				</ul>

				<form className="form-inline my-2 my-lg-0">
      				<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
     				 <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    			</form>
				{this.props.isLoggedIn ? <><p>Welcome {this.props.username}</p> <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button></> : <><LoginModal/><RegisterModal/></>}
				
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


