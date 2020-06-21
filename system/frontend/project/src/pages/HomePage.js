import React, { Component } from 'react'
import Background from '../background.jpg'
import {Heading} from 'rebass'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {

	render() {
		return (
			<div className="container">
				<img src={Background} alt="" className="bg"/>
					<Heading fontSize={[ 5, 6, 7 ]} color="primary">Welcome to Recipe Website</Heading>
					<Link to={{ pathname: "/recipes"}}>
					<button className="btn btn-lg btn-success mid_win" >Start Exloring</button>
					</Link>
			</div>
		)
	}
}
