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

	dataURLtoFile=(imgData)=>{
		if(imgData===undefined)
			return
		const filename=imgData.fileName
		const dataurl=`data:${imgData.fileType};base64,${imgData.data}`
		var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), 
		n = bstr.length, 
		u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
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
					<h1 className="text-monospace">{this.props.user_recipe.title}</h1>
					{/* {this.props.user_recipe.img!==undefined&&<img className="img-fluid" src={URL.createObjectURL(this.dataURLtoFile(this.props.user_recipe.img))} alt="Card image cap"/>}
					<h2>Description: <br/> {this.props.user_recipe.descript
					ion}</h2> */}
					{/* {this.props.recipe.img!==undefined&&<div className="card" style={{width: 18 + 'em'}}>
						<img className="img-fluid" src={URL.createObjectURL(this.dataURLtoFile(this.props.recipe.img))} alt="Card image cap"/>
						<div class="card-body">
							<p class="card-text">{this.props.recipe.description}</p>
						</div>
					</div>} */}
					{this.props.user_recipe.img!==undefined && <div className="card mb-4">
						<img className="img-fluid " src={URL.createObjectURL(this.dataURLtoFile(this.props.user_recipe.img))} alt="Card image cap"/>
						<div class="card-body">
							<h4>Description</h4>
							<p class="card-text">{this.props.user_recipe.description}</p>
						</div>
					</div>}
					<div>
					<h3>Ingredients</h3>
					{this.props.user_recipe.ingredients !== undefined && this.props.user_recipe.ingredients.map(item=>{
						return(
							
								<p>{item.ingredient}:{item.category}:{item.amount}</p>
							
						)
					})}
					</div>
					{this.props.user_recipe.instructions!== undefined && this.props.user_recipe.instructions.map((item, index)=>{
						return(<p>Step {index+1}:{item}</p>)
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
					<h1 className="text-monospace">{this.props.recipe.title}</h1>
					{this.props.recipe.img!==undefined && <div className="card mb-4">
						<img className="img-fluid " src={URL.createObjectURL(this.dataURLtoFile(this.props.recipe.img))} alt="Card image cap"/>
						<div class="card-body">
							<h4>Description</h4>
							<p class="card-text">{this.props.recipe.description}</p>
						</div>
					</div>}
					<div>
					<h3>Ingredients</h3>
					{this.props.recipe.ingredients !== undefined && this.props.recipe.ingredients.map(item=>{
						return(
							
								<p>{item.ingredient}:{item.category}:{item.amount}</p>
							
						)
					})}
					</div>
					{this.props.recipe.instructions!== undefined && this.props.recipe.instructions.map((item, index)=>{
						return(<p>Step {index+1}:{item}</p>)
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
