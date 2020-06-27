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
			// title: props.location.state ? props.location.state.title: "",
			// description: props.location.state? props.location.state.description: "",
			// ingredients: props.location.state? props.location.state.ingredients: [],
			// instructions: props.location.state? props.location.state.instructions: [],
			// type: props.location.state? props.location.state.type: ""
		})
	}

	componentDidMount() {
		console.log('mounted')
		const path = window.location.pathname
		var temp = path.split('/')
		const id = temp[temp.length-1];
		let showEdit = temp[1]==="contributor" ? true : false
		this.props.checkLoggedIn()
		if(this.props.loggedIn === true){
			this.props.getUserRecipe(parseInt(id))
		}else{
			console.log("not logged")
			this.props.fetchRecipes()
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
		if(this.state.edit === false){
			if(this.props.loggedIn === true){
				console.log(this.props)
				if(this.props.user_recipe!==undefined){
					return(
						// need to edit to make it pretty
						<div className="container">
							<h1>{this.props.user_recipe.title}</h1>
							<h2>{this.props.user_recipe.description}</h2>
							{this.props.user_recipe.ingredients !== undefined && this.props.user_recipe.ingredients.map(item=>{
								return(
									<div>
										<p>{item.ingredient}</p>
										<p>{item.category}</p>
										<p>{item.amount}</p>
									</div>
								)
							})}
							{this.props.user_recipe.instructions!== undefined && this.props.user_recipe.instructions.map(item=>{
								// console.log(item)
								return(<p>{item}</p>)
							})}
							
							{this.state.showEdit===true && <Link to={{ pathname: `/edit/${this.props.user_recipe.recipeID}` }}>
								<button type="button" id={`edit`} className="btn btn-danger" onClick={this.editRecipe}>Edit</button>
							</Link>}
						</div>
					)
				}else{
					return(
						<Spinner animation="border" variant="primary" />
					)
					
				}
				
			}
			else if(this.props.recipe!==undefined){
				console.log(this.props)
				return(
					<div className="container">
						<h1>{this.props.recipe.title}</h1>
						<h2>{this.props.recipe.description}</h2>
						{this.props.recipe.ingredients !== undefined && this.props.recipe.ingredients.map(item=>{
							return(
								<div>
									<p>{item.ingredient}</p>
									<p>{item.category}</p>
									<p>{item.amount}</p>
								</div>
							)
						})}
						{this.props.recipe.instructions!== undefined && this.props.recipe.instructions.map(item=>{
							// console.log(item)
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
		}else{
			return(
				<PostRecipe edit={true}/>
			)
		}
		
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
