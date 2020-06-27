import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchIngredients } from '../actions/explorerActions'
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
			result:{}
		}
	}

	componentDidMount() {
		this.props.fetchIngredients()
		// const temp={}
		// Object.assign(temp, this.props.ingredients);
		// this.setState({
		// 	ingredients: temp
		// })
	}

	onClick=(e)=>{
		if(this.state.selected[e.target.name][e.target.value]===undefined){
			const temp={}
			Object.assign(temp, this.state.selected);
			temp[e.target.name][e.target.value]=true
			this.setState({
				selected: temp
			})
		}else{
			const temp={}
			Object.assign(temp, this.state.selected);
			temp[e.target.name][e.target.value]=!this.state.selected[e.target.name][e.target.value]
			this.setState({
				selected: temp
			})
		}
	}

	onDelete=(e)=>{
		e.preventDefault()
		console.log("delete")
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
		this.props.searchRecipes()
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
		console.log(temp)
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
	render() {
		let checkbox=<div></div>
		// if not null:
		// let ingredients={Dairy: ["milk", "egg"], Vegetables:["tomato"], "Baking & Grains": ["bread"], Spices:["tomato"], Meats: ["bread"],Fish:["tomato"], "Baking & Grains": ["bread"], Seafood:["tomato"], "Baking & Grains": ["bread"],  Sauces:["tomato"], Legumes: ["bread"], Beverages:["b"], Nuts:["nuts"], Alcohol:[], Condiments:[], Oils:[]}
		// console.log(this.props.ingredients)
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
		let selected=<div></div>
		selected = Object.keys(this.state.selected).map(key=> {
			return(
				Object.keys(this.state.selected[key]).map(elem=>{
					if(this.state.selected[key][elem]===true){
						return(
							<li className="list-group-item">{key}: {elem}<button type="button" class="close" aria-label="Close" onClick={e=>this.onDelete(e)}>
							<span aria-hidden="true" name={key} value={elem}>&times;</span>
						  </button></li>
						)
					}
				})
			)
		});

		let result=<div>You can search</div>
		console.log(this.state.result)
		result=Object.keys(this.state.result).map(key=>{
			return(
				Object.keys(this.state.result[key]).map(elem=>{
					console.log(key, elem)
					return(
						<div className="form-check text-left">
						<input name={key} value={elem} type="checkbox" className="form-check-input" checked={this.state.selected[key][elem]} onChange={e=>this.onClick(e)}/>
						<label className="form-check-label" >{key}:{elem}</label>
						</div>
					)	
				})
			)	
		})
		console.log(result)
		return (
			<>
			<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal">
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
						<p className="font-italic h4">List of Ingredients</p>
							<div className="accordion" id="checkboxes">
							{checkbox}
							</div>
						</div>
						<div className="col-md-5">
						<form class="form-inline">
							<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e=>this.onChange(e)}/>
							<button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={e=>this.filterSearch(e)}>Search</button>
						</form>
						<div class="form-check">
						{result}
						</div>
						</div>
						<div className="col-md-5 overflow-auto">
						<p className="font-italic h4">Selected</p>
							<ul className="list-group">
							{selected}
							</ul>
							<button type="submit" className="btn btn-primary" onClick={e=>this.search(e)} data-dismiss="modal"> Search </button>
						</div>
						</div>
					</div>
					</div>
				</div>
			</div>
			</>
			
		)
	}
}


const mapStateToProps = state => ({
	ingredients: state.explorers.ingredients
})

export default connect(mapStateToProps, {fetchIngredients, searchRecipes})(Ingredients)



