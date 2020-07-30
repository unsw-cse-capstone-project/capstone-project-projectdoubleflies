import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecipes, fetchUserRecipes, deleteRecipe, searchRecipes} from '../actions/recipeActions'
import { Button, Icon} from 'semantic-ui-react'

import { fetchUserFavourite, removeFavourite, addFavourite} from '../actions/explorerActions';
import { checkLoggedIn } from '../actions/userActions'
import ConfirmationModal from './ConfirmationModal';

class ListRecipe extends Component {
	constructor(props) {
		super(props)
		this.state = {
			kind: "",
			deleted: false,
			size: 15,
			offset: 0,
			prev: 0,
			searching: false
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
		window.addEventListener('scroll', this.handleScroll) 
		this.props.checkLoggedIn()
		const path = window.location.href.split("/")
		let kind= path[path.length-1]
		if(kind==="?"){
			kind=""	
		}
		this.setState({
			kind: kind
		})
		if(kind==="contributor"){
			this.props.fetchUserRecipes(this.props.username, 0);	
		}else if(kind==="explorer"){
			this.props.fetchUserFavourite(this.props.username);
		}else{
			const temp=JSON.parse(localStorage.getItem("search"))
			if(temp===null){
				this.props.fetchRecipes(0)
				this.setState({
					searching: false
				})
			}else if(Object.keys(temp).length === 0){
				this.props.fetchRecipes(0)
				this.setState({
					searching: false
				})
			}else if(temp["ingredients"].length===0 && !temp.type){
				this.props.fetchRecipes(0)
				this.setState({
					searching: false
				})
			}else{
				this.props.searchRecipes(temp["ingredients"], temp["type"])
				this.setState({
					searching: true
				})
			}
		}
	}

	handleScroll=()=>{
		if(this.state.searching===true)
			return
			
		if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight-5) {
			const offset=this.state.offset+15;
			const size=this.state.size+15;
			this.setState({
				offset: offset,
				size: size,
			})
			if(this.state.kind==="")
				this.props.fetchRecipes(offset)
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
		if(this.state.kind==="contributor"){
			temp = this.props.user_recipes
		}else if(this.state.kind==="explorer"){
			temp = this.props.favs
		}else{
			temp = this.props.recipes
		}
		
		let cards=[]
		let loading=null
		if(Array.isArray(temp)){
			loading=<div className="spinner-border text-primary" role="status">
  				<span className="sr-only">Loading...</span>
			</div>
			if(this.props.offset){
				if(this.props.offset.length===0){
					loading=
					<ul className="list-group">
						<li className="list-group-item">
							<p className="card-text">No More Recipes</p>
						</li>
					</ul>
				}
			}

			if(this.state.searching===true||this.state.kind==="contributor"||this.state.kind==="explorer")
				loading=
				<ul className="list-group">
					<li className="list-group-item">
						<p className="card-text">No More Recipes</p>
					</li>
				</ul>


			const pathname = this.state.kind==="contributor" ? "/contributor/view/": "/view/";
				cards = temp.slice(0, this.state.size).map(item => {
					return (
						<div className="card m-2 card-same" style={{width: 18 + 'em'}}>
						<Link to={{ pathname: `${pathname}${item.recipeID}`}}>
						{item.img && <img className="card-img-top" src={URL.createObjectURL(this.dataURLtoFile(item.img))} alt="..."/>}
						<div className="card-body">
						<h5 className="card-title card-same-title">{item.title}</h5>
						<h6 className="card-subtitle mb-2">Description</h6>
						<p className="card-text card-same-text">{item.description}</p>
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
		
			<div className="row d-flex justify-content-center">
				{cards}
			</div>
			<div className="row d-flex justify-content-center">
				{loading}
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
	deleted: state.recipes.deleted,
	offset:state.recipes.offset
});

export default connect(mapStateToProps, {fetchRecipes, fetchUserRecipes, checkLoggedIn, deleteRecipe, fetchUserFavourite, removeFavourite, addFavourite, searchRecipes})(ListRecipe);