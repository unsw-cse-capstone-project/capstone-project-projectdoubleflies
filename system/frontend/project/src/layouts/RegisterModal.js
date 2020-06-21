import React, { Component } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import { checkUsername, registerUser, checkLoggedIn } from '../actions/userActions'
import { connect } from 'react-redux';
class RegisterModal extends Component {

	constructor(props) {
		super (props);

		this.state={
			show:false, 
			invalid_user: "d-none",
			valid_user: "d-none",
			username: "",
			password: "",
			repassword: "", 
			isValidPass: false,
			isValidRePass: false,
			showSuccess: true
		}
	}

	handleShow=(e)=>{
		this.setState({
			show: !this.state.show,
			invalid_user: "d-none",
			valid_user: "d-none",
			username: "",
			password: "",
			repassword: ""
		})
	}

	handleClose=(e)=>{
		this.setState({
			show: false
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log("register")
		this.props.registerUser(this.state.username, this.state.password)
		
		// if(this.props.isRegistered===true){
		// 	console.log("yes")
		// 	this.handleClose()
		// }else{
		// 	console.log(this.props.isRegistered)
		// 	console.log("no")
		// }
	}

	onChangeUser=(e)=>{
		console.log(e.target.name, e.target.value)
		this.setState(
			{username: e.target.value}
		)
		// console.log("onchange")
		this.check(e.target.value);
	}
	checkPassword=(e)=>{
		const pass = e.target.value
		const regex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
		this.setState(
			{
				password: pass,
				isValidPass: regex.test(pass)
			}
		)
		console.log(`password ${regex.test(pass)}`)
		console.log(pass)
	}

	checkRePassword=(e)=>{
		const pass = e.target.value
		const regex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
		this.setState(
			{
				repassword: pass,
				isValidRePass: regex.test(pass) && (pass===this.state.password)
			}
		)
		console.log(`password ${regex.test(pass) && (pass===this.state.password)}`)
		console.log(pass)
		console.log(this.state.password)
	}

	onKeyDown=(e)=>{
		// console.log(e.key)
		if(e.key==='Backspace'){
			var str = this.state.username;
			str = str.substring(0, str.length - 1)
			this.check(str)
		}
	}

	check = (e, username) => {
		// console.log('check')
		console.log(this.state.username)
		console.log(username)
		if(this.state.username==="" && username===undefined){
			this.setState({
				invalid_user:"d-block",
				valid_user: "d-none"
			})
		}else if(username===""){
			this.setState({
				invalid_user:"d-block",
				valid_user: "d-none"
			})
		}
		else{
			this.props.checkUsername()
			console.log("check if exists")
			// check if exist
			console.log(this.props.isValid)
			
			if(this.props.isValid===true){
				console.log("valid")
				this.setState({
					invalid_user: "d-none",
					valid_user: "d-block"
				})
			}
			
		}
	}

	handleSuccess = ()=>{
		this.handleClose()
		this.props.checkLoggedIn()
		this.setState({
			showSuccess: false
		})
	}
	render() {
		console.log(this.props.isRegistered)
		return (
			<>
				<Button className="ml-1" variant="primary" onClick={this.handleShow}>
					Register
				</Button>

				<Modal show={this.state.show && !this.props.isRegistered} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Register Form</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form>
					<Form.Group controlId="formBasicUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control className="flex-wrap" name="username" type="text" placeholder="Enter Username" onChange={this.onChangeUser} onKeyDown={this.onKeyDown}/>
						<Form.Control.Feedback className={this.state.invalid_user} type="invalid">Invalid Username</Form.Control.Feedback>
						<Form.Control.Feedback className={this.state.valid_user} type="valid">Looks good!</Form.Control.Feedback>
						
					</Form.Group>
					
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control name="passowrd" type="password" placeholder="Password" onFocus={this.check} onChange={this.checkPassword}/>
					</Form.Group>

					<Form.Group controlId="formBasicRePassword">
						<Form.Label>Re-Enter Password</Form.Label>
						<Form.Control name="repassowrd" type="password" placeholder="Password" onChange={this.checkRePassword}/>
					</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleClose}>
					Close
					</Button>
					<Button variant="primary" type="submit" onClick={this.handleSubmit} disabled={(!this.props.isValid) || (!this.state.isValidPass) || (!this.state.isValidRePass)}>
					Register
					</Button>
				</Modal.Footer>
				</Modal>

				<Modal show={this.props.isRegistered && this.state.showSuccess} onHide={this.handleSuccess}>
					<Modal.Header closeButton>
						<Modal.Title>Registered as {this.state.username}</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>success</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleSuccess}>Close</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapStateToProps = state => ({
	isValid: state.users.valid,
	isRegistered: state.users.registered
});

export default connect(mapStateToProps, {checkUsername, registerUser, checkLoggedIn})(RegisterModal);
