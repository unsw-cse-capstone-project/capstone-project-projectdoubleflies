import React, { Component } from 'react'
import ListRecipe from '../layouts/ListRecipe'
import Ingredients from '../layouts/Ingredients'
import Background from '../new_background.jpg'
export default class PublicPage extends Component {
	render() {
		return (
			<div className="row container-fluid py-3">
				<img src={Background} alt="" className="bg"/>
				<div className="col-2 sticky-sidebar">
					<div className="sticky-top justify-content-center">
					<Ingredients/>
					</div>
				</div>
				<div className="col" id="main">
					<ListRecipe/>
				</div>
				
			</div>
		)
	}
}
