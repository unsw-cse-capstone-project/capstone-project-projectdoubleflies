import React, { Component } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {loginUser, checkLoggedIn} from  '../actions/userActions'
import {connect} from 'react-redux';

class LoginModal extends Component {

	constructor(props) {
		super (props);

		this.state={
			show:false,
			disable: true,
			username: "",
			password: "",
			showSuccess: true
		}
	}

	handleShow=(e)=>{
		this.setState({
			show: !this.state.show
		})
	}

	handleClose=(e)=>{
		this.setState({
			show: false
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.loginUser(this.state.username, this.state.password);
	}
	
	onChangeUser=(e)=>{
		this.setState({
			username :e.target.value
		})
		if(e.target.value!=="" && this.state.password!==""){
			this.setState({
				disable: false
			})
		}else{
			this.setState({
				diable: true
			})
		}
	}

	onChangePass=(e)=>{
		this.setState({
			password :e.target.value
		})
		if(e.target.value!=="" && this.state.username!==""){
			this.setState({
				disable: false
			})
		}else{
			this.setState({
				diable: true
			})
		}
	}

	handleSuccess=(e)=>{
		this.handleClose()
		this.props.checkLoggedIn()
		this.setState(
			{ showSuccess: false }
		)
	}
	render() {
		return (
			<div>
				<Button className="ml-1 btn-margin btn-secondary" variant="primary" onClick={this.handleShow}>
					Login
				</Button>

				<Modal show={this.state.show && !this.props.isLogged} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Login Form</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form>
					<Form.Group controlId="formBasicUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control name="username" type="test" placeholder="Enter Username" onChange={this.onChangeUser}/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control name="password" type="password" placeholder="Password" onChange={this.onChangePass}/>
					</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleClose}>
					Close
					</Button>
					<Button variant="primary" type="submit" onClick={this.handleSubmit} disabled={this.state.disable}>
					Login
					</Button>
				</Modal.Footer>
				</Modal>
				<Modal show={this.props.isLogged && this.state.showSuccess} onHide={this.handleSuccess}>
					<Modal.Header closeButton>
						<Modal.Title>Logged in as {this.state.username}</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Logged in Successfully</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleSuccess}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state =>({
	isLogged: state.users.logged,
})
	

export default connect(mapStateToProps, {loginUser, checkLoggedIn})(LoginModal)