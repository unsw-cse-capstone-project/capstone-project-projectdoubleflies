import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchIngredients, suggestIngredients } from '../actions/explorerActions'
import { searchRecipes } from '../actions/recipeActions'
import { Button, Icon} from 'semantic-ui-react'
class Ingredients extends Component {
	constructor(props) {
		super(props);
		this.state={
			selected: {
				Dairy:{}, Vegetables:{}, Fruites:{}, "Baking & Grains":{}, "Added Sweeteners":{}, Spices:{}, Meats:{}, Fish:{}, Seafood:{}, Condiments:{}, Oils:{}, Seasonings:{}, Sauces:{}, Legumes:{}, Alcohol:{}, Soup:{}, Nuts:{}, "Dairy Alternative":{}, "Desserts & Snackes":{}, Beverages:{}
			},
			// ingredients:{},
			word: "",
			result:{},
			type: undefined,
			// types: ["Breads", "Breakfast", "Cakes", "Casseroles", "Cookies", "Desserts", "Dinner", "Dips", "Drinks", "Fish recipes", "Grilling & BBQ", "Kid Friendly", "Meat recipes", "Poultry recipes", "Quick & Easy", "Salad Dressings", "Salads", "Sandwiches", "Sauces", "Seafood recipes", "Slow Cooker", "Soups", "Vegetarian recipes", "Vegan recipes", "Gluten free recipes", "Lactose free recipes", "Lunch"],
			types: ["Breads", "Breakfast", "Cakes", "Casseroles", "Cookies", "Desserts", "Dinner", "Dips", "Drinks", "Fish recipes", "Grilling & BBQ", "Kid Friendly", "Meat recipes", "Poultry recipes", "Quick & Easy", "Salad Dressings", "Salads", "Sandwiches", "Sauces", "Seafood recipes", "Slow Cooker", "Soups", "Vegetarian recipes", "Vegan recipes", "Gluten free recipes", "Lactose free recipes", "Lunch"],
			selected_type: {"Breads": false, "Breakfast": false,"Cakes": false, "Casseroles": false, "Cookies": false, "Desserts": false, "Dinner": false, "Dips": false, "Drinks": false, "Fish recipes": false, "Grilling & BBQ": false, "Kid Friendly": false, "Meat recipes": false, "Poultry recipes": false, "Quick & Easy": false, "Salad Dressings": false, "Salads": false, "Sandwiches": false, "Sauces": false, "Seafood recipes": false, "Slow Cooker": false, "Soups": false, "Vegetarian recipes": false, "Vegan recipes": false, "Gluten free recipes": false, "Lactose free recipes": false, "Lunch": false},
			ingredients: []
		}
	}

	componentDidMount() {
		this.props.fetchIngredients()
		this.props.suggestIngredients([])
		let temp=null
		if(localStorage.getItem("search")!==null)
			temp =JSON.parse(localStorage.getItem("search"))
		const t={}
		if(localStorage.getItem("map")===null)
			Object.assign(t, this.state.selected)
		else{
			console.log(localStorage.getItem("map")) 
			Object.assign(t, JSON.parse(localStorage.getItem("map")))
		}
		if(temp!==null)
			this.setState({
				type: temp["type"],
				selected: t
			})
		else 
			this.setState({
				selected: t
			})
	}

	onClick=(e)=>{
		if(this.state.selected[e.target.name][e.target.value]===undefined){
			const temp={}
			Object.assign(temp, this.state.selected);
			temp[e.target.name][e.target.value]=true
			const ing=[...this.state.ingredients]
			ing.push(e.target.value)
			this.props.suggestIngredients(ing)
			this.setState({
				selected: temp,
				ingredients: ing
			})
		}else{
			const temp={}
			Object.assign(temp, this.state.selected);
			temp[e.target.name][e.target.value]=!this.state.selected[e.target.name][e.target.value]

			let ing=[...this.state.ingredients]
			if(temp[e.target.name][e.target.value]===true)
				ing.push(e.target.value)
			else 
				ing=ing.filter(i => i!==e.target.value);
				this.props.suggestIngredients(ing)
			this.setState({
				selected: temp,
				ingredients: ing
			})
		}
	}

	onDelete=(e)=>{
		const key = e.target.getAttribute('name')
		const value = e.target.getAttribute('value')
		const temp={}
		Object.assign(temp, this.state.selected);
		temp[key][value]=!this.state.selected[key][value]
		this.setState({
			selected: temp
		})
	}

	search=(e)=>{
		e.preventDefault();
		localStorage.setItem("map", JSON.stringify(this.state.selected))
		const ingredients=[]
		Object.keys(this.state.selected).map(key=>{
			Object.keys(this.state.selected[key]).map(elem=>{
				if(this.state.selected[key][elem]===true)
					ingredients.push(elem)
			})
		})
		this.props.searchRecipes(ingredients, this.state.type)
	}

	filterSearch=(e)=>{
		e.preventDefault();
		console.log(this.state.word)
		const temp = {}
		Object.keys(this.props.ingredients).map(key=>{
			temp[key]={}
			this.props.ingredients[key].map(elem=>{
				if(elem===this.state.word){
					temp[key][elem]=true
				}
			})
		})
		this.setState({
			result: temp
		})
	}

	onChange=(e)=>{
		e.preventDefault();
		this.setState({
			word: e.target.value
		})
	}

	onFilter=(e)=>{
		const cur=this.state.type
		const selected={}
		Object.assign(selected, this.state.selected_type);
		selected[cur]=false;
		selected[e.target.value]=!this.state.selected_type[e.target.value]
		this.setState({
			selected_type: selected, 
			type: e.target.value
		})
	}
	render() {
		let checkbox=<div></div>
		if(this.props.ingredients!==undefined){
			checkbox = Object.keys(this.props.ingredients).map((key, id) =>{
				console.log(this.state.selected[key], key)
				if(this.state.selected[key]!==undefined){
					return(
						<div className="card">
							<div className="card-header" id={`heading${id}`}>
								<h2 className="mb-0">
								<button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${id}`}aria-expanded="true" aria-controls={`collapse${id}`}>
									<p className="h5">{key}</p>
								</button>
								</h2>
							</div>
							<div id={`collapse${id}`} className="collapse" aria-labelledby={`heading${id}`} data-parent="#checkboxes">
							<div className="card-body">
								{this.props.ingredients[key].map(elem=>{
									return(
										<div className="form-check">
											<input name={key} value={elem} type="checkbox" className="form-check-input" checked={this.state.selected[key][elem]} onChange={e=>this.onClick(e)}/>
											<label className="form-check-label" >{elem}</label>
										</div>
									)
								})
								}
								</div>
							</div>
						</div>
					)
				}
			})
		}
		let sel=<div></div>
		let num=0
		sel = Object.keys(this.state.selected).map(key=> {
			return(
				Object.keys(this.state.selected[key]).map(elem=>{
					if(this.state.selected[key][elem]===true){
						num=+1
						return(
							<li className="list-group-item">{key}: {elem}<button type="button" className="close" aria-label="Close" onClick={e=>this.onDelete(e)}>
							<span aria-hidden="true" name={key} value={elem}>&times;</span>
						</button></li>
						)
					}
				})
			)
		});
		if(num===0)
			sel=<div>No Ingredients Selected</div>

		let result=<div>You can search</div>
		result=Object.keys(this.state.result).map(key=>{
			return(
				Object.keys(this.state.result[key]).map(elem=>{
					return(
						<div className="form-check text-left">
						<input name={key} value={elem} type="checkbox" className="form-check-input" checked={this.state.selected[key][elem]} onChange={e=>this.onClick(e)}/>
						<label className="form-check-label" >{key}:{elem}</label>
						</div>
					)	
				})
			)	
		})

		
		const types=this.state.types.map(elem=>{
			console.log(this.state.type, elem, this.state.selected_type[elem])
			return(
				
				<div className="form-check text-left">
					<input name={elem} value={elem} type="checkbox" className="form-check-input" checked={this.state.selected_type[elem]} onChange={e=>this.onFilter(e)}/>
					<label className="form-check-label" >{elem}</label>
				</div>
			)	
		})
		
		return (
			<>
			<div className="container">
			<div className="row">
				{/* <Button className="button-margin" as='div' labelPosition='right'/> 
				<Button className="btn-margin" color='red' size='mini' onClick={(e)=>this.props.popularRecipes()}>
					<Icon name='hand peace outline'/>
					See Popular Recipes
				</Button> */}
				<div className="col-md-10 overflow-auto">
				<label className="font-italic h5 d-inline title-margin">Filter By Meal-Type</label>
				<div className="custom-control custom-checkbox">
					<ul className="list-group">
					{types}
				</ul>
				</div>
				<form className="form-inline">
					<label className="font-italic h5 d-inline title-margin">Choose Ingredients<br/></label>
					<div className="input-group">
					
					<input className="form-control mr-sm-2 input-sm" type="search" placeholder="Search" aria-label="Search" onChange={e=>this.onChange(e)}/>
					<button className="btn btn-outline-success my-2 my-sm-0 btn-sm" type="submit" onClick={e=>this.filterSearch(e)}>Search</button>
					</div>
				</form>
				{this.props.suggestions!=="" &&<div className="card m-1">
					<div class="card-body">Suggested Ingredients <br/> {this.props.suggestions}</div>
				</div>}
				{this.props.suggestions==="" &&<div className="card m-1">
					<div class="card-body">No Suggestions</div>
				</div>}
				<div className="form-check">
				{result}
				</div>
					<div className="accordion" id="checkboxes">
					{checkbox}
					</div>
				</div>
				<div className="w-100 title-margin"></div>
				<div className="col-md-10 overflow-auto">
					<p className="font-italic h5 d-inline title-margin">Selected</p>
					<ul className="list-group">
					{sel}
					</ul>
				</div>
				
			</div>
			<div className="col-md-10 overflow-auto">
			<button type="submit" className="btn btn-primary" onClick={e=>this.search(e)} data-dismiss="modal"> Search </button>
			</div>
			</div>
			{/* <button type="button" className="btn btn-primary btn-margin" data-toggle="modal" data-target="#modal">
  				Pick Ingredients
			</button>
			<div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Pick Ingredients</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
					<div className="row">
						<div className="col-md-6 overflow-auto">
						<form className="form-inline">
								<div className="input-group">
								<input className="form-control mr-sm-2 input-sm" type="search" placeholder="Search" aria-label="Search" onChange={e=>this.onChange(e)}/>
								<button className="btn btn-outline-success my-2 my-sm-0 btn-sm" type="submit" onClick={e=>this.filterSearch(e)}>Search</button>
								</div>
							</form>
						<div className="form-check">
						{result}
						</div>
							<div className="accordion" id="checkboxes">
							{checkbox}
							</div>
						</div>
						<div className="col-md-6 overflow-auto">
						<p className="font-italic h4">Filter By Meal-Type</p>
							<ul className="list-group">
							{types}
							</ul>
						
							<p className="font-italic h4">Selected</p>
							<ul className="list-group">
							{selected}
							</ul>
							</div>
						
					</div> */}
					{/* <div className="ui grid">
						<div className="row">
							<div className="eight wide column overflow-auto">
								<form className="form-inline">
									<div className="input-group">
									<input className="form-control mr-sm-2 input-sm" type="search" placeholder="Search" aria-label="Search" onChange={e=>this.onChange(e)}/>
									<button className="btn btn-outline-success my-2 my-sm-0 btn-sm" type="submit" onClick={e=>this.filterSearch(e)}>Search</button>
									</div>
								</form>
								<div className="form-check">
									{result}
								</div>
								<div className="accordion" id="checkboxes">
									{checkbox}
								</div>
							</div>
							<div className="seven wide column">
								<div className="input-group">
								<label className="font-italic h4">Filter By Meal-Type</label>
								<ul className="list-group">
								{types}
								</ul>
								</div>
								<p className="font-italic h4">Selected</p>
								<ul className="list-group">
								{selected}
								</ul>
							</div>
						</div>
					</div> */}
					
					{/* <div className="col-md-6">
			
						<form className="form-inline">
							<div className="input-group">
							<input className="form-control mr-sm-2 input-sm" type="search" placeholder="Search" aria-label="Search" onChange={e=>this.onChange(e)}/>
							<button className="btn btn-outline-success my-2 my-sm-0 btn-sm" type="submit" onClick={e=>this.filterSearch(e)}>Search</button>
							</div>
						</form>
						<p className="font-italic h4">List of Ingredients</p>
						<div className="accordion" id="checkboxes">
						{checkbox}
						</div>
					</div>
					<div className="col-md-5">
							<div className="form-check">
							{result}
							</div>
								<p className="font-italic h4">Selected</p>
								<ul className="list-group">
								{selected}
								</ul>
							<p className="font-italic h4">Filter By Meal-Type</p>
								<ul className="list-group">
								{types}
								</ul>
					</div> */}
					{/* <div className="row">
						<div className="col-md-6 overflow-auto">
						<p className="font-italic h4">List of Ingredients</p>
							<div className="accordion" id="checkboxes">
							{checkbox}
							</div>
						</div>
						<div className="col-md-5">
							<form className="form-inline">
								<div className="input-group">
								<input className="form-control mr-sm-2 input-sm" type="search" placeholder="Search" aria-label="Search" onChange={e=>this.onChange(e)}/>
								<button className="btn btn-outline-success my-2 my-sm-0 btn-sm" type="submit" onClick={e=>this.filterSearch(e)}>Search</button>
								</div>
							</form>
							<div className="form-check">
							{result}
							</div>
						</div>
						<div className="col-md-6 overflow-auto">
							<p className="font-italic h4">Selected</p>
							<ul className="list-group">
							{selected}
							</ul>
						</div>
						<div className="col-md-5 overflow-auto">
						<p className="font-italic h4">Filter By Meal-Type</p>
							<ul className="list-group">
							{types}
							</ul>
						</div>
					</div> */}
					{/* <button type="submit" className="btn btn-primary" onClick={e=>this.search(e)} data-dismiss="modal"> Search </button>
					</div>
					</div>
				</div>
			</div> */}
			</>
			
		)
	}
}


const mapStateToProps = state => ({
	ingredients: state.explorers.ingredients,
	suggestions: state.explorers.suggestions
})

export default connect(mapStateToProps, {fetchIngredients, searchRecipes, suggestIngredients})(Ingredients)



