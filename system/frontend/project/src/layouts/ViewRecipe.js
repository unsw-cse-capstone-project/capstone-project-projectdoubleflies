import React, { Component } from 'react'
import PostRecipe from '../pages/PostRecipe';
import { connect } from 'react-redux'
import { getRecipe, getUserRecipe, fetchRecipes} from '../actions/recipeActions'
import { checkLoggedIn } from '../actions/userActions'
import { PropTypes } from 'prop-types'
import { Spinner } from 'react-bootstrap'
import { Button, Icon} from 'semantic-ui-react'
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
		const path = window.location.pathname
		var temp = path.split('/')
		const id = temp[temp.length-1];
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
		let data=this.props.recipe;
		if(this.state.showEdit===true)
			data=this.props.user_recipe
		
		if(this.state.edit){
			return(
				<PostRecipe edit={true}/>
			)
		}

		if(data!==undefined){
			return(
				<div className="container pb-5 pt-5">
					<h1 className="text-monospace">{data.title}</h1>
					{data.img!==undefined && <div className="card mb-4 img-view">
						<img className="img-fluid img-view" src={URL.createObjectURL(this.dataURLtoFile(data.img))} alt=""/>
						<div class="card-body">
							<h5>Description</h5>
							<p class="card-text">{data.description}</p>
						</div>
					</div>}
					<div className="p-2">
					<h4>Meal-Type: {data.type}</h4>
					</div>
					<div className="p-2">
						<h4>Ingredients</h4>
						<table class="table">
						<thead>
							<tr>
							<th scope="col">Ingredient</th>
							<th scope="col">Amount</th>
							</tr>
						</thead>
						<tbody>
							
							{data.ingredients !== undefined && data.ingredients.map(item=>{
								return(
									<tr>
										<td>{item.ingredient}</td>
										<td>{item.amount}</td>
									</tr>
								)
							})}			
						</tbody>
						</table>
					</div>
					<div className="p-2">
					<h3>Instructions</h3>
						<table class="table">
						<thead>
							<tr>
							</tr>
						</thead>
						<tbody>
							
							{data.ingredients!== undefined && data.instructions.map((item, index)=>{
								return(
									<tr>
										<td>Step {index+1}</td>
										<td>{item}</td>
									</tr>
								)
							})}			
						</tbody>
						</table>
					</div>
					{this.state.showEdit===true && 
						<div>
							<Button className="button-margin" as='div' labelPosition='right'/>
							<Button className="btn-margin" size='mini' onClick={this.editRecipe}>
							<Icon name='edit' />
							Edit
							</Button>
						</div>
					}
					
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
