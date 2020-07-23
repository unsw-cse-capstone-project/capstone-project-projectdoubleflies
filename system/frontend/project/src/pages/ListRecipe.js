import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecipes, fetchUserRecipes, deleteRecipe, searchRecipes} from '../actions/recipeActions'
import { Button, Icon} from 'semantic-ui-react'

import { fetchUserFavourite, removeFavourite, addFavourite} from '../actions/explorerActions';
import { checkLoggedIn } from '../actions/userActions'
import ConfirmationModal from '../layouts/ConfirmationModal';

class ListRecipe extends Component {
	constructor(props) {
		super(props)
		this.state = {
			kind: "",
			deleted: false
		}
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
		this.props.checkLoggedIn()
		const path = window.location.href.split("/")
		const kind= path[path.length-1]
		console.log(kind)
		this.setState({
			kind: kind
		})
		if(kind===""){
			if(kind===""){
				const temp=localStorage.getItem("search")
				if(temp!==null)
					this.props.searchRecipes(temp["ingredients"], temp["type"])
					
				else
					this.props.fetchRecipes()
			}
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
	}
	render() {
		let temp
		if(this.state.kind===""){
			temp = this.props.recipes
		}else if(this.state.kind==="contributor"){
			temp = this.props.user_recipes
		}else if(this.state.kind==="explorer"){
			temp = this.props.favs
		}
		let cards=[]
		if(temp!==undefined){
			const pathname = this.state.kind==="contributor" ? "/contributor/view/": "/view/";
			cards = temp.map(item => {
				return (
					<div className="card m-2" style={{width: 18 + 'em'}}>
					<Link to={{ pathname: `${pathname}${item.recipeID}`}}>
					{item.img && <img className="card-img-top" src={URL.createObjectURL(this.dataURLtoFile(item.img))} alt="..."/>}
					<div className="card-body">
					<h5 className="card-title">{item.title}</h5>
					<h6 className="card-subtitle mb-2">Description</h6>
					<p className="card-text card-same">{item.description}</p>
					</div>
					</Link>
					{
						this.state.kind==="" && this.props.loggedIn &&
						<div>
							<Button className="button-margin" as='div' labelPosition='right'/>
							<Button className="btn-margin" size='mini' color='red' onClick={(e)=>this.addFavourite(e, item.recipeID)}>
								<Icon name='heart' />
								Favourite
							</Button>
						</div>
					}
					
					{
						this.state.kind==="contributor" &&
						<div>
							<ConfirmationModal message={"Delete"} func={this.deleteRecipe} param={item.recipeID}/>
						</div>
					}
					{
						this.state.kind==="explorer" && 
						<div>
							<ConfirmationModal message={"Remove"} func={this.removeFavourite} param={item.recipeID}/>
						</div>
					
					}
				</div>
				)
			})

		}
		return (
			<div className="container-fluid">	
			
			{cards.length===0&& <div> No Recipe Found </div>}
			<div className="row d-flex justify-content-center">
				{cards}
			</div>
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

export default connect(mapStateToProps, {fetchRecipes, fetchUserRecipes, checkLoggedIn, deleteRecipe, fetchUserFavourite, removeFavourite, addFavourite, searchRecipes})(ListRecipe);