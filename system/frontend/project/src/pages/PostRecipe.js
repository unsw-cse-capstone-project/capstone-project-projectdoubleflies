import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux'
import { getRecipe, giveRecommendation, createRecipe, editRecipe} from '../actions/recipeActions';
import { checkLoggedIn } from '../actions/userActions';
import { Redirect } from 'react-router-dom';

class PostRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      edit: this.props.edit ? this.props.edit: false,
      id: "",
      title: "",
      desc: "",
      ingredient_rows:[],
      instruction_rows:[],
      chosen: "Chosen...",
      selections:["Breakfast", "Lunch", "Snack", "Dinner"],
      display:["Breakfast", "Lunch", "Snack", "Dinner"]
    })
  }

  componentDidMount() {
    if(this.state.edit===true){
      const path = window.location.pathname
      var temp = path.split('/')
      const id = temp[temp.length-1];
      // console.log(id)
      this.props.getRecipe(id)
      // this.props.getRecipe(5)
      var array = [...this.state.selections];
      if(this.props.chosen!==undefined)
        array = array.filter(e=>e!==this.props.chosen)

      console.log(this.props.recipe)
      this.setState(
        {
          title: this.props.recipe.title ? this.props.recipe.title: "",
          id: id,
          desc: this.props.recipe.description ? this.props.recipe.description: "",
          ingredient_rows: this.props.recipe.ingredients ? this.props.recipe.ingredients: [],
          instruction_rows: this.props.recipe.instructions ? this.props.recipe.instructions: [],
          chosen: this.props.recipe.type ? this.props.recipe.type: "Chosen ...",
          display: array
        }
      )
    }
  }
   
  onChangeText=(event)=>{
    event.preventDefault();
    console.log(event.target.id)
    this.setState(
      { [event.target.id]: event.target.value}
    )
  } 

  addInstruction= (event) => {
    event.preventDefault();
    this.setState(
      {instruction_rows: this.state.instruction_rows.concat(
          [
            ""
          ]
        ),
      }
    );
    console.log(this.state.instruction_rows)
  }

  deleteInstruction=(e, id)=>{
    e.preventDefault();
    var array = [...this.state.instruction_rows];
    array.splice(id, 1);
    this.setState(
         { instruction_rows: array }
      )
  }

  onChangeInstruction=(event)=>{
    event.preventDefault();
    var temp = event.target.id.split("_");
    var id = temp[temp.length-1];
    var array=[...this.state.instruction_rows];
    array[id]= event.target.value;
    console.log(array[id])
    this.setState(
      { instruction_rows: array }
    )
  }

  addIngredient=(event)=>{
    event.preventDefault();
    this.setState(
      {ingredient_rows: this.state.ingredient_rows.concat(
            [
               {ingredient: "", category:"", amount:""}
            ]
         ),
      }
    )
  }

  deleteIngredient=(e, id)=>{
    e.preventDefault();
    console.log(id)
    var array = [...this.state.ingredient_rows];
    array.splice(id, 1);
    this.setState(
         { ingredient_rows: array }
      )
  }
  
  onChangeIngredient=(event)=>{
    event.preventDefault();
    var temp = event.target.id.split("_");
    var id = temp[temp.length-1]
    var array = [...this.state.ingredient_rows];
    array[id].ingredient=event.target.value
    if(event.target.value!==""){
      this.props.giveRecommendation(event.target.value)
      array[id].category = this.props.category;
      this.setState(
        {ingredient_rows: array}
      )
    }else{
      this.setState(
        {ingredient_rows: array}
      )
    }
    
   
  }


  onChangeCategory=(event)=>{
    event.preventDefault();
    var temp = event.target.id.split("_");
    var id = temp[temp.length-1]
    var array = [...this.state.ingredient_rows];
    array[id].category=event.target.value
    this.setState(
      {ingredient_rows: array}
    )
  }

  onChangeAmount=(event)=>{
    event.preventDefault();
    var temp = event.target.id.split("_");
    var id = temp[temp.length-1]
    var array = [...this.state.ingredient_rows];
    array[id].amount=event.target.value
    this.setState(
      {ingredient_rows: array}
    )
  }

  onChangeType = (event) =>{
    event.preventDefault();
    var chosen = event.target.value
    var array = [...this.state.selections];
    array = array.filter(e=>e!==chosen)
    this.setState(
      {chosen: event.target.value,
        display: array
      }
    )
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.edit===false){
      var obj = JSON.parse(localStorage.getItem("username"));
      if(obj===null){
        alert("Please Login First")
        return
      }
      obj.id = obj.username;
      delete obj.username;
      console.log('submitting')
      var temp ={
        title: this.state.title,
        description: this.state.desc,
        ingredients: this.state.ingredient_rows, 
        instructions: this.state.instruction_rows,
        type: this.state.chosen,
        user: obj
      }
      console.log(temp)
      this.props.createRecipe(temp)
    }else{
      var obj = JSON.parse(localStorage.getItem("username"))[0];
      if(obj===null){
        alert("Please Login First")
        return
      }
      obj.id = obj.username;
      delete obj.username;
      var temp ={
        title: this.state.title,
        description: this.state.desc,
        ingredients: this.state.ingredient_rows, 
        instructions: this.state.instruction_rows,
        type: this.state.chosen,
        user: obj
      }
      console.log("editing")
      console.log(temp)
      this.props.editRecipe(temp)
    }
    
  }

	render() {
    this.props.checkLoggedIn()
    const ins_rows = this.state.instruction_rows.map((item, id)=>{
        return (
          <div onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}className="form-row">
            <p>Step {id+1}:</p>
              <div className="col">
              <input id={`ins_step_${id}`} name="instruction" type="text" className="form-control" placeholder="Instruction" value={item} onChange={(e)=>this.onChangeInstruction(e)}/>
            </div>
            <button type="button" id={`ins_del_${id}`} className="btn btn-danger" onClick={(e)=>this.deleteInstruction(e, id)}>Delete</button>
          </div>
        )
    })

    const ing_rows = this.state.ingredient_rows.map((item, id)=>{
      return (
        <div onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} className="form-row">
          <p>{id+1}:</p>
          <div className="col">
            <input id={`ing_name_${id}`} name="ingredient" type="text" className="form-control" placeholder="Ingredient" value={item.ingredient} onChange={(e)=>this.onChangeIngredient(e)} />
          </div>
          <div className="col">
            <input id={`ing_category_${id}`} name="category" type="text" className="form-control" placeholder="category" value={item.category} onChange={(e)=>this.onChangeCategory(e)} />
          </div>
          <div className="col">
            <input id={`ing_amount_${id}`} name="amount" type="text" className="form-control" placeholder="amount" value={item.amount} onChange={(e)=>this.onChangeAmount(e)} />
          </div>
          <button type="button" id={`ing_del_${id}`} className="btn btn-danger" onClick={(e)=>this.deleteIngredient(e, id)}>Delete</button>
        </div>
      )
    })

    const options = this.state.display.map((item, id)=>{
      return (
        <option key={id}>{item}</option>
      )  
    })
    
		return (
      <div className="container">
        <form onSubmit={ this.onSubmit }>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Your Recipe Title" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} value={this.state.title} onChange={e=>this.onChangeText(e)}/>
          </div>
          <div className="form-group">
            <textarea id="desc" className="form-control" rows="5" placeholder="Your Recipe Description" value={this.state.desc} onChange={e=>this.onChangeText(e)}/>
          </div>
          <div className="form-group">
            <label htmlFor="ingredient">Ingredients</label>
            <button type="button" onClick={(e)=>this.addIngredient(e)}className="btn btn-outline-success btn-sm">Add Ingredients</button>
              {ing_rows}
          </div>
          <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <button type="button" onClick={(e)=>this.addInstruction(e)}className="btn btn-outline-success btn-sm">Add Instructions</button>
            {ins_rows} 
          </div>

          <div className="form-group">
            <label htmlFor="inputType">Type</label>
            <select id="inputType" className="form-control" onChange={(e)=>this.onChangeType(e)} value={this.state.chosen}>
            <option selected>{this.state.chosen}</option>
            {options}
            </select>
          </div>
          {this.state.edit && <a href={`/view/${this.state.id}`}><button type="button" className="btn btn-danger">Cancel</button></a>}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {!this.props.loggedIn && <Redirect to="/"/>}
      </div>
		)
	}
}

const mapStateToProps = state=>({
  recipe: state.recipes.user_item,
  category: state.recipes.category,
  loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps, {getRecipe, giveRecommendation,createRecipe, checkLoggedIn, editRecipe})(PostRecipe)
