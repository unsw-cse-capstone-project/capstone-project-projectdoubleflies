import React, { Component } from 'react'
import { fetchIngredients, pickIngredient} from '../actions/explorerActions';
import { connect } from 'react-redux';
class PickIngredients extends Component {
	render() {
		return (
			<div>
				
			</div>
		)
	}
}

const mapStateToProps = state=> ({
	ingredients: state.explorers.ingredients,
	picked: state.explorers.picked
})
export default connect(mapStateToProps,{fetchIngredients, pickIngredient})(PickIngredient)
