import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkLoggedIn } from '../actions/userActions';
import {searchIng} from '../actions/recipeActions'
import { Redirect } from 'react-router'
import ListRecipe from '../layouts/ListRecipe'
import Background from '../new_background.jpg'
class ContributorPage extends Component {

	constructor(props) {
		super(props)
		this.state={
			success: false
		}
	}
	componentDidMount() {
		this.props.checkLoggedIn();
		if(this.props.location.state===true){
			
			return(
				alert("Recipe Saved")
			)	
		}
		this.setState({
			success:false
		})
	}

	onSearch=(e)=>{
		e.preventDefault();
		this.props.searchIng();
	}

	render(){
		return (
			<div className="container-fluid pb-5">
				<img src={Background} alt="" className="bg"/>
				<div className="container p-5">
				<div className="ui placeholder segment">
					<div className="ui icon header">
						<i className="search icon"></i>
						Find Frequently Searched Set of Ingredients
					</div>
					{this.props.set_ing!==undefined&&
						<div className="inline">
							
							<h3>Results</h3>
							
							<div className="row justify-content-center">
							{this.props.set_ing.constructor=== Object && Object.keys(this.props.set_ing).map(key=>{
								
								return(
									<div className="col-md-4">
									<div className="card m-2" style={{width: 18 + 'em'}}>
										<ul className="list-group list-group-flush  ">
										{this.props.set_ing[key].map(elem=>{
											return(
												<li className="list-group-item">{elem}</li>
											)
										})}
										</ul>
									</div>
									</div>
								)
								
							})}
							</div>
							<div className="ui primary button mt-4" onClick={e=>this.onSearch(e)}>Search Again</div>
						</div>
					}
					{
					this.props.set_ing===undefined&&<div className="inline  mt-4">
						<div className="ui primary button" onClick={e=>this.onSearch(e)}>Search</div>
					</div>
					}	
				</div>
				</div>
				<h3 className="font-weight-bold font-italic">My Recipes</h3>
				<Link to={{ pathname: "/post"}}>
					<button className="m-2 btn btn-primary" type="button">Create Recipe</button>
				</Link>
				
				<ListRecipe/>
				{!this.props.loggedIn && <Redirect to="/"/>}
			</div>
			
		)
	}
}
const mapStateToProps = state => ({
	loggedIn: state.users.loggedIn,
	set_ing: state.recipes.set_ing

});

export default connect(mapStateToProps, {checkLoggedIn,searchIng})(ContributorPage);