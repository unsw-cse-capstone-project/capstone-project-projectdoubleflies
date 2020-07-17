import React, { Component } from 'react'
import { Button, Icon} from 'semantic-ui-react'
import {Modal} from 'react-bootstrap'

class DeleteModal extends Component {

	constructor(props) {
		super (props);

		this.state={
			message: this.props.message,
			func: this.props.func,
			param: this.props.param,
			showSuccess: true,
			show: false
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

	render() {
		return (
			<div>
				<Button className="button-margin" as='div' labelPosition='right'/>
				<Button className="btn-margin" onClick={this.handleShow} size='mini'>
					<Icon name='trash' />
					{this.state.message}
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				Are you sure you want to {this.state.message} this recipe?
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-secondary" variant="secondary" onClick={this.handleClose}>
					Cancel
					</button>
					<button className="btn btn-primary" variant="primary" type="submit" onClick={e=>{this.state.func(e, this.state.param); this.handleClose(e)}}>
					{this.state.message}
					</button>
				</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default DeleteModal