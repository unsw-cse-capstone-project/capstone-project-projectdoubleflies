// import React, { Component } from 'react'
// import { fetchIngredients, pickIngredient} from '../actions/explorerActions';
// import { connect } from 'react-redux';
// import { Checkbox } from 'element-react';

// export default class PickIngredients extends Component {
// 	constructor(props) {
// 		super(props);
	  
// 		this.state = {
// 		  checkList: []
// 		}
// 	  }
// 	  render() {
// 		return (
// 			<div>
// 				<Checkbox.Group value={this.state.checkList}>
// 				<Checkbox label="Option A "></Checkbox>
// 				<br />
// 				<Checkbox label="Option B "></Checkbox>
				
// 				<Checkbox label="Option C "></Checkbox>
// 				</Checkbox.Group>
// 			</div>
// 		)
// 	  }
	  
// }

// // const mapStateToProps = state=> ({
// // 	ingredients: state.explorers.ingredients,
// // 	picked: state.explorers.picked
// // })
// // export default connect(mapStateToProps,{fetchIngredients, pickIngredient})(PickIngredient)
