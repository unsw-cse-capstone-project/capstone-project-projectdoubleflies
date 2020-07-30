import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchIngredients, suggestIngredients } from '../actions/explorerActions'
import { searchRecipes } from '../actions/recipeActions'

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
		if(!e.target.name && !e.target.name){
			this.props.suggestIngredients([])
		}else if(this.state.selected[e.target.name][e.target.value]===undefined){
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
		Object.keys(this.state.selected).forEach(key=>{
			Object.keys(this.state.selected[key]).forEach(elem=>{
				if(this.state.selected[key][elem]===true)
					ingredients.push(elem)
			})
		})
		this.props.searchRecipes(ingredients, this.state.type)
		window.location.href = "/"
	}

	clearSearch=(e)=>{
		e.preventDefault();
		this.setState({
			selected: {
				Dairy:{}, Vegetables:{}, Fruites:{}, "Baking & Grains":{}, "Added Sweeteners":{}, Spices:{}, Meats:{}, Fish:{}, Seafood:{}, Condiments:{}, Oils:{}, Seasonings:{}, Sauces:{}, Legumes:{}, Alcohol:{}, Soup:{}, Nuts:{}, "Dairy Alternative":{}, "Desserts & Snackes":{}, Beverages:{}
			},
			// ingredients:{},
			word: "",
			result:{},
			type: undefined,
			types: ["Breads", "Breakfast", "Cakes", "Casseroles", "Cookies", "Desserts", "Dinner", "Dips", "Drinks", "Fish recipes", "Grilling & BBQ", "Kid Friendly", "Meat recipes", "Poultry recipes", "Quick & Easy", "Salad Dressings", "Salads", "Sandwiches", "Sauces", "Seafood recipes", "Slow Cooker", "Soups", "Vegetarian recipes", "Vegan recipes", "Gluten free recipes", "Lactose free recipes", "Lunch"],
			selected_type: {"Breads": false, "Breakfast": false,"Cakes": false, "Casseroles": false, "Cookies": false, "Desserts": false, "Dinner": false, "Dips": false, "Drinks": false, "Fish recipes": false, "Grilling & BBQ": false, "Kid Friendly": false, "Meat recipes": false, "Poultry recipes": false, "Quick & Easy": false, "Salad Dressings": false, "Salads": false, "Sandwiches": false, "Sauces": false, "Seafood recipes": false, "Slow Cooker": false, "Soups": false, "Vegetarian recipes": false, "Vegan recipes": false, "Gluten free recipes": false, "Lactose free recipes": false, "Lunch": false},
			ingredients: []
		})
		localStorage.removeItem("map")
		this.onClick(e)
	}

	filterSearch=(e)=>{
		e.preventDefault();
		const temp = {}
		Object.keys(this.props.ingredients).forEach(key=>{
			temp[key]={}
			this.props.ingredients[key].forEach(elem=>{
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
											<input id={`check-${key}`} name={key} value={elem} type="checkbox" className="form-check-input" checked={this.state.selected[key][elem]} onChange={e=>this.onClick(e)}/>
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
			sel=<p>No Ingredients Selected</p>

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

		const types = this.state.types.map((elem, id)=>{
			return (
			  <option key={`type_${id}`}>{elem}</option>
			)
		})
		
		return (
			<div className="sidebar container">
				<div className="form-group m-1">
				<label className="font-weight-bold font-italic h5 d-inline title-margin">Filter By Meal-Type</label>
            		<select id="inputType" className="form-control m-1" onChange={e=>this.onFilter(e)} value={this.state.type}>
            		<option selected>{this.state.type}</option>
            		{types}
            	</select>
          		</div>
				<div className="m-1">
					<button type="button" className="btn btn-primary" onClick={e=>this.clearSearch(e)}> Clear Search </button>
				</div>
				<form className="form-inline d-flex justify-content-center">
						<label className="font-weight-bold font-italic h5 d-inline title-margin">Choose Ingredients<br/></label>
						<div className="input-group">
							<input className="form-control mr-sm-2 input-sm" type="search" placeholder="Search" aria-label="Search" onChange={e=>this.onChange(e)}/>
							<button className="btn btn-primary my-2 my-sm-0 btn-sm" type="submit" onClick={e=>this.filterSearch(e)}>Search</button>
						</div>
				</form>
				{this.props.suggestions!=="" &&<div className="card m-1">
					<div class="card-body">
					<h6  className="card-title font-italic font-weight-bold">Suggested Ingredients</h6>
					<p className="card-text font-weight-bold">{this.props.suggestions}</p>
					</div>
				</div>}
				{this.props.suggestions==="" &&<div className="card m-1">
					<div className="card-body">No Suggestions</div>
				</div>}
				<div className="form-check">
					{result}
				</div>
					<div className="accordion" id="checkboxes">
					{checkbox}
					</div>
					<div className="overflow-auto m-1">
					<label className="font-weight-bold font-italic h5 d-inline title-margin">Selected</label>
					<ul className="list-group">
					{sel}
					</ul>
					
				</div>
				<div className="m-1">
					<button type="submit" className="btn btn-primary" onClick={e=>this.search(e)} data-dismiss="modal"> Search </button>
				</div>
			</div>
			
		)
	}
}


const mapStateToProps = state => ({
	ingredients: state.explorers.ingredients,
	suggestions: state.explorers.suggestions
})

export default connect(mapStateToProps, {fetchIngredients, searchRecipes, suggestIngredients})(Ingredients)



