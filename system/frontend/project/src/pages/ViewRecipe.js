import React, { Component } from 'react'
import PostRecipe from './PostRecipe';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getRecipe, getUserRecipe, fetchRecipes} from '../actions/recipeActions'
import { checkLoggedIn } from '../actions/userActions'
import { PropTypes } from 'prop-types'
import { Spinner } from 'react-bootstrap'
class ViewRecipe extends Component {

	constructor(props) {
		super(props);

		this.state = ({
			edit: false,
			recipe: {},
			showEdit: false
		})
	}

	componentDidMount() {
		console.log('mounted')
		const path = window.location.pathname
		var temp = path.split('/')
		const id = temp[temp.length-1];
		console.log(id)
		let showEdit = temp[1]==="contributor" ? true : false
		if(temp[1]==="contributor"){
			this.props.getUserRecipe(parseInt(id))
		}else if(temp[1]==="view"){
			this.props.getRecipe(parseInt(id))
		}
		this.setState({
			showEdit: showEdit
		})
	}

	editRecipe=(e)=>{
		e.preventDefault();
		this.setState(
			{ edit: true}
		)
	}

	render() {
		if(this.state.edit){
			return(
				<PostRecipe edit={true}/>
			)
		}else if(this.state.showEdit===true && this.props.user_recipe!==undefined){
			return(
				// need to edit to make it pretty
				<div className="container">
					<h1>{this.props.user_recipe.title}</h1>
					//TODO
					{/* <img class="card-img-top" src={URL.createObjectURL(this.props.user_recipe.image)} alt="Card image cap"/> */}
					<h2>{this.props.user_recipe.description}</h2>
					{this.props.user_recipe.ingredients !== undefined && this.props.user_recipe.ingredients.map(item=>{
						return(
							<div>
								<p>{item.ingredient}:{item.category}:{item.amount}</p>
							</div>
						)
					})}
					{this.props.user_recipe.instructions!== undefined && this.props.user_recipe.instructions.map(item=>{
						return(<p>{item}</p>)
					})}
					
					{this.state.showEdit===true && <Link to={{ pathname: `/edit/${this.props.user_recipe.recipeID}` }}>
						<button type="button" id={`edit`} className="btn btn-danger" onClick={this.editRecipe}>Edit</button>
					</Link>}
				</div>
			)
		}
		else if(this.props.recipe!==undefined){
			console.log(this.props.recipe)
			return(
				<div className="container">
					<h1>{this.props.recipe.title}</h1>
					//TODO
					{/* <img class="card-img-top" src={URL.createObjectURL(this.props.recipe.image)} alt="Card image cap"/> */}
					<h2>{this.props.recipe.description}</h2>
					{this.props.recipe.ingredients !== undefined && this.props.recipe.ingredients.map(item=>{
						return(
							<div>
								<p>{item.ingredient}: {item.category}: {item.amount}</p>
							</div>
						)
					})}
					{this.props.recipe.instructions!== undefined && this.props.recipe.instructions.map(item=>{
						return(<p>{item}</p>)
					})}
					
					{this.state.showEdit===true && <Link to={{ pathname: `/edit/${this.props.recipe.recipeID}` }}>
						<button type="button" id={`edit`} className="btn btn-danger" onClick={this.editRecipe}>Edit</button>
					</Link>}
				</div>
			)

		}else{
			return(
				<Spinner animation="border" variant="primary" />
			)
		}
		// else{
		// 	return(
		// 		<PostRecipe edit={true}/>
		// 	)
		// }
		
	}
}

ViewRecipe.propTypes = {
	recipe: PropTypes.object.isRequired
}
const mapStateToProps = state=> ({
	recipe: state.recipes.item,
	recipes: state.recipes.items,
	loggedIn: state.users.loggedIn,
	user_recipe: state.recipes.user_item
})

export default connect(mapStateToProps, {fetchRecipes, getRecipe, checkLoggedIn, getUserRecipe})(ViewRecipe)
