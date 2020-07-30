import React, { Component } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import { checkUsername, registerUser, checkLoggedIn} from '../actions/userActions'
import { connect } from 'react-redux';

class RegisterModal extends Component {

	constructor(props) {
		super (props);

		this.state={
			show:false, 
			invalid_user: "d-none",
			valid_user: "d-none",
			invalid_password: "d-none",
			invalid_repassword: "d-none",
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
		this.props.registerUser(this.state.username, this.state.password)
	}

	onChangeUser=(e)=>{
		this.setState(
			{username: e.target.value}
		)
		this.check(e.target.value);
	}
	checkPassword=(e)=>{
		const pass = e.target.value
		const regex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)
		if(regex.test(pass)===true){
			this.setState(
				{
					password: pass,
					isValidPass: true,
					invalid_password: "d-none"
				}
			)
		}else{
			this.setState({
				password: pass,
				isValidPass: false,
				invalid_password: "d-block"
			})
		}
		
	}

	checkRePassword=(e)=>{
		const pass = e.target.value
		const regex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)
		if(this.state.password===pass){
			this.setState(
				{
					repassword: pass,
					isValidRePass: regex.test(pass) && (pass===this.state.password),
					invalid_repassword: "d-none"
				}
			)
		}else{
			this.setState(
				{
					repassword: pass,
					isValidRePass: regex.test(pass) && (pass===this.state.password),
					invalid_repassword: "d-block"
				}
			)
		}
	}

	onKeyDown=(e)=>{
		if(e.key==='Backspace'){
			var str = this.state.username;
			str = str.substring(0, str.length - 1)
			this.check(str)
		}
	}

	check = (e, username) => {
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
			if(this.props.isValid===true){
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
		return (
			<>
				<Button className="ml-1 btn-margin btn-secondary" variant="primary" onClick={this.handleShow}>
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
						<Form.Control name="passowrd" type="password" placeholder="Password" onFocus={this.checkPassword} onChange={this.checkPassword}></Form.Control>
						<Form.Text className="text-muted">password should be at least 6 letters long and must contain at least one capital, non-capital and numbers</Form.Text>
						<Form.Control.Feedback className={this.state.invalid_password} type="invalid">Invalid Password</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="formBasicRePassword">
						<Form.Label>Re-Enter Password</Form.Label>
						<Form.Control name="repassowrd" type="password" placeholder="Password" onChange={this.checkRePassword} onFocus={this.checkRePassword}/>
						<Form.Control.Feedback className={this.state.invalid_repassword} type="invalid">Check Your Password</Form.Control.Feedback>
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
						<p>Welcome {this.state.username}!</p>
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
