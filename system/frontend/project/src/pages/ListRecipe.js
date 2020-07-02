import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipes, fetchUserRecipes, deleteRecipe} from '../actions/recipeActions'

import { fetchUserFavourite, removeFavourite, addFavourite} from '../actions/explorerActions';
import { checkLoggedIn } from '../actions/userActions';
import { Redirect } from 'react-router'
import Ingredients from '../layouts/Ingredients'
import {
	Grid,
} from '@material-ui/core/'

class ListRecipe extends Component {
	constructor(props) {
		super(props)
		this.state = {
			kind: "",
			deleted: false
		}
	}

	dataURLtoFile=(imgData)=>{
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
		this.props.checkLoggedIn()
		const path = window.location.href.split("/")
		const kind= path[path.length-1]
		console.log(kind)
		this.setState({
			kind: kind
		})
		if(kind==="recipes"){
			console.log("fetching recipes")
			this.props.fetchRecipes()
		}else if(kind==="contributor"){
			this.props.fetchUserRecipes(this.props.username);	
		}else if(kind==="explorer"){
			this.props.fetchUserFavourite(this.props.username);
		}
	}

	addFavourite = (e, id)=>{
		e.preventDefault();
		this.props.addFavourite(this.props.username, id)
	}

	removeFavourite = (e, id)=>{
		e.preventDefault();
		this.props.removeFavourite(this.props.username, id)
	}

	deleteRecipe = (e, id) => {
		e.preventDefault();
		this.props.deleteRecipe(id);
		{this.props.deleted===true&&alert("Successfully Deleted Recipe")}
	}
	render() {
		let temp
		if(this.state.kind==="recipes"){
			temp = this.props.recipes
		}else if(this.state.kind==="contributor"){
			temp = this.props.user_recipes
		}else if(this.state.kind==="explorer"){
			temp = this.props.favs
		}
		console.log(temp)
		let cards
		if(temp!==undefined){
			const pathname = this.state.kind==="contributor" ? "/contributor/view/": "/view/";
			
			cards = temp.map(item => (
				<div className="card m-2" style={{width: 18 + 'em'}}>
					<Link to={{ pathname: `${pathname}${item.recipeID}`}}>
					<div className="card-body">
					<img className="card-img-top" src={URL.createObjectURL(this.dataURLtoFile(item.img))} alt="Card image cap"/>
						<h5 className="card-title">Title: <br/> {item.title}</h5>
						<p className="card-text">Description: <br/> {item.description}</p>
						
							{/* <p className="d-block">Check this out</p> */}
					</div>
					</Link>
					{this.state.kind==="recipes" && this.props.loggedIn && <button className="btn btn-sm btn-danger" onClick={(e)=>this.addFavourite(e, item.recipeID)}>FAVOURITE</button>}
					{this.state.kind==="contributor" && <button className="btn btn-sm btn-danger" onClick={(e)=>this.deleteRecipe(e, item.recipeID)}>DELETE</button>}
					{this.state.kind==="explorer" && <button className="btn btn-sm btn-danger" onClick={(e)=>this.removeFavourite(e, item.recipeID)}>Remove</button>}
				</div>
			))
		}
		
		return (
			<div className="container">	
			{this.state.kind==="recipes" && <Ingredients/>}
			
			<Grid container direction="row" justify="center" alignItems="center">
				{cards}

			</Grid>
			
			</div>
		)
	}
}
const mapStateToProps = state => ({
	user_recipes: state.recipes.user_items,
	favs: state.explorers.favs,
	recipes: state.recipes.items,
	username: state.users.username,
	loggedIn: state.users.loggedIn,
	deleted: state.recipes.deleted
});

export default connect(mapStateToProps, {fetchRecipes, fetchUserRecipes, checkLoggedIn, deleteRecipe, fetchUserFavourite, removeFavourite, addFavourite})(ListRecipe);