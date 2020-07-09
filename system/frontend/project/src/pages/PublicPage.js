import React, { Component } from 'react'
import ListRecipe from './ListRecipe'
import { PUBLIC } from '../helpers/type'
import Ingredients from '../layouts/Ingredients'
export default class PublicPage extends Component {
	render() {
		return (
			// <div>
			// <Ingredients/>
			// <ListRecipe/>
			// </div>
			<div class="row py-3">
				<div class="col-3 sticky-sidebar">
					<div class="sticky-top">
					<Ingredients/>
					</div>
				</div>
				<div class="col" id="main">
					<ListRecipe/>
				</div>
				
			</div>
		)
	}
}
