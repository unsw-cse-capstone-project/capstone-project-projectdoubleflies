import React, { Component } from 'react'
import ListRecipe from './ListRecipe'
import { PUBLIC } from '../helpers/type'
import Ingredients from '../layouts/Ingredients'
import Background from '../background.jpg'
export default class PublicPage extends Component {
	render() {
		return (
			// <div>
			// <Ingredients/>
			// <ListRecipe/>
			// </div>
			<div className="row py-3">
				<img src={Background} alt="" className="bg"/>
				<div className="col-3 sticky-sidebar">
					<div className="sticky-top">
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
