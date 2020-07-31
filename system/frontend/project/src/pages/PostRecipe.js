import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getRecipe, giveRecommendation, createRecipe, editRecipe} from '../actions/recipeActions';
import { checkLoggedIn } from '../actions/userActions';
import { Redirect } from 'react-router-dom';
import { Button, Icon} from 'semantic-ui-react'

class PostRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      edit: this.props.edit ? this.props.edit: false,
      id: "",
      title: "",
      desc: "",
      ingredient_rows:[{ingredient: undefined, category:undefined, amount:undefined, unit: undefined}],
      instruction_rows:[undefined],
      categories: ["Dairy", "Vegetables", "Fruites", "Baking & Grains", "Added Sweeteners", "Spices", "Meats", "Fish", "Seafood", "Condiments", "Oils", "Seasonings", "Sauces", "Legumes", "Alcohol", "Soup", "Nuts", "Dairy Alternative", "Desserts & Snacks", "Beverages"],
      chosen: "Choose...",
      selections:["Breads", "Breakfast", "Cakes", "Casseroles", "Cookies", "Desserts", "Dinner", "Dips", "Drinks", "Fish recipes", "Grilling & BBQ", "Kid Friendly", "Meat recipes", "Poultry recipes", "Quick & Easy", "Salad Dressings", "Salads", "Sandwiches", "Sauces", "Seafood recipes", "Slow Cooker", "Soups", "Vegetarian recipes", "Vegan recipes", "Gluten free recipes", "Lactose free recipes", "Lunch"],
      display:["Breads", "Breakfast", "Cakes", "Casseroles", "Cookies", "Desserts", "Dinner", "Dips", "Drinks", "Fish recipes", "Grilling & BBQ", "Kid Friendly", "Meat recipes", "Poultry recipes", "Quick & Easy", "Salad Dressings", "Salads", "Sandwiches", "Sauces", "Seafood recipes", "Slow Cooker", "Soups", "Vegetarian recipes", "Vegan recipes", "Gluten free recipes", "Lactose free recipes", "Lunch"],
      units:["cup","cm", "mm", "m", "mg", "g", "kg", "teaspoon", "tablespoon", "ml", "l", "dl", "gallon", "gill", "package","piece", "pint","pound", "fluid ounce", "inch", "quart", "ounce"],
      alertPresent: false,
      base64: undefined,
      file: undefined,
    })
  }

  dataURLtoFile=(dataurl, filename)=>{
 
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
    if(this.state.edit===true){
      const path = window.location.pathname
      var temp = path.split('/')
      const id = temp[temp.length-1];
      this.props.getRecipe(id)
      var array = [...this.state.selections];
      if(this.props.chosen!==undefined)
        array = array.filter(e=>e!==this.props.chosen)

      const imgData = this.props.recipe.img
      let imgFile
      if(imgData!==undefined){
        let imgUri=`data:${imgData.fileType};base64,${imgData.data}`
        imgFile=this.dataURLtoFile(imgUri, imgData.fileName)
      }

      this.setState(
        {
          title: this.props.recipe.title ? this.props.recipe.title: "",
          id: id,
          desc: this.props.recipe.description ? this.props.recipe.description: "",
          ingredient_rows: this.props.recipe.ingredients ? this.props.recipe.ingredients: [{ingredient: undefined, category:undefined, amount:undefined, unit: undefined}],
          instruction_rows: this.props.recipe.instructions ? this.props.recipe.instructions: [undefined],
          file: imgFile,
          chosen: this.props.recipe.type ? this.props.recipe.type: "Chosen ...",
          display: array,
          alertPresent: false
        }
      )
    }
  }
   
  onChangeText=(event)=>{
    event.preventDefault();
    this.setState(
      { [event.target.id]: event.target.value}
    )
  } 

  addInstruction= (event) => {
    event.preventDefault();
    this.setState(
      {instruction_rows: this.state.instruction_rows.concat(
          [
            undefined
          ]
        ),
      }
    );
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
    this.setState(
      { instruction_rows: array }
    )
  }

  addIngredient=(event)=>{
    event.preventDefault();
    this.setState(
      {ingredient_rows: this.state.ingredient_rows.concat(
            [
               {ingredient: undefined, category:undefined, amount:undefined, unit: undefined}
            ]
         ),
      }
    )
  }

  deleteIngredient=(e, id)=>{
    e.preventDefault();
    var array = [...this.state.ingredient_rows];
    array.splice(id, 1);
    this.setState(
         { ingredient_rows: array }
      )
  }

  onBlurIngredient=(event)=>{
    event.preventDefault();
    var temp = event.target.id.split("_");
    var id = temp[temp.length-1]
    var array = [...this.state.ingredient_rows];
    if(event.target.value!==""){
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

  onKeyPressIngredient=(event)=>{
    if(event.key!== "Enter"){
      return
    }
    event.preventDefault();
    var temp = event.target.id.split("_");
    var id = temp[temp.length-1]
    var array = [...this.state.ingredient_rows];
    if(event.target.value!==""){
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
  
  onChangeIngredient=(event)=>{
    event.preventDefault();
    var temp = event.target.id.split("_");
    var id = temp[temp.length-1]
    var array = [...this.state.ingredient_rows];
    array[id].ingredient=event.target.value
    this.setState(
      {ingredient_rows: array}
    )
    if(event.target.value!==""){
      this.props.giveRecommendation(event.target.value)
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

  onChangeUnit=(event)=>{
    event.preventDefault();
    var temp = event.target.id.split("_");
    var id = temp[temp.length-1]
    var array = [...this.state.ingredient_rows];
    array[id].unit=event.target.value
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
      {
        chosen: event.target.value,
        display: array
      }
    )
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    const obj = JSON.parse(localStorage.getItem("username"));
    var temp
    if(this.state.edit===false){
      
      if(obj===null){
        alert("Please Login First")
        return
      }
      obj.id = obj.username;
      delete obj.username;
      temp ={
        title: this.state.title,
        description: this.state.desc,
        ingredients: this.state.ingredient_rows, 
        instructions: this.state.instruction_rows,
        type: this.state.chosen,
        user: obj
      }
      const formData = new FormData();
      formData.append('file', this.state.file);
      this.props.createRecipe(obj.id, temp, formData)
    }else{
   
      if(obj===null){
        alert("Please Login First")
        return
      }
      obj.id = obj.username;
      delete obj.username;
      temp ={
        title: this.state.title,
        description: this.state.desc,
        ingredients: this.state.ingredient_rows, 
        instructions: this.state.instruction_rows,
        type: this.state.chosen,
        user: obj
      }
      const formData = new FormData();
      formData.append('file', this.state.file);
      this.props.editRecipe(this.state.id, temp,formData)
    }
    
  }

  onChangeImage=(e)=>{
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        base64: reader.result
      });
    };
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
            <Button className="button-margin" as='div' labelPosition='right'/>
				    <Button className="btn-margin" id={`ins_del_${id}`} onClick={(e)=>this.deleteInstruction(e, id)} size='mini'>
					    <Icon name='trash' />
				    </Button>
          </div>
        )
    })

    

    const ing_rows = this.state.ingredient_rows.map((item, id)=>{
      return (
        <div onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} className="form-row">
          <p>{id+1}:</p>
          <div className="col">
            <input id={`ing_name_${id}`} name="ingredient" type="text" className="form-control" placeholder="Ingredient" value={item.ingredient} onChange={(e)=>this.onChangeIngredient(e)} onBlur={e=>this.onBlurIngredient(e)} onKeyPress={e=>this.onKeyPressIngredient(e)}/>
          </div>
          <div className="col">
            <select id={`ing_category_${id}`} className="form-control" onChange={(e)=>this.onChangeCategory(e)} value={item.category}>
            <option selected>{item.category}</option>
            {this.state.categories.map((category, id)=>{
              return (
                <option key={id}>{category}</option>
              )  
            })}
            </select>
          </div>
          <div className="col">
            <input id={`ing_amount_${id}`} name="amount" type="text" className="form-control" placeholder="amount" value={item.amount} onChange={(e)=>this.onChangeAmount(e)} />
          </div>
          <div className="col">
            <select id={`ing_unit_${id}`} className="form-control" onChange={(e)=>this.onChangeUnit(e)} value={item.unit}>
              <option selected>{item.unit}</option>
              
              {this.state.units.map((unit, id)=>{
                return (
                  <option key={id}>{unit}</option>
                )  
            })}
            </select>
          </div>
          <Button className="button-margin" as='div' labelPosition='right'/>
				  <Button className="btn-margin" id={`ing_del_${id}`} onClick={(e)=>this.deleteIngredient(e, id)} size='mini'>
					  <Icon name='trash' />
				  </Button>
        </div>
      )
    })

    const options = this.state.display.map((item, id)=>{
      return (
        <option key={id}>{item}</option>
      )  
    })

   

		return (
      <div className="container pt-5">
        <form className="form-padding">
          <div className="form-group">
            <h4>Create Your Recipe</h4>
            <label className="font-italic h5 d-inline title-margin">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Your Recipe Title" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} value={this.state.title} onChange={e=>this.onChangeText(e)}/>
          </div>
          <div className="form-group">
          <label className="font-italic h5 d-inline title-margin">Upload Image</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={e=>this.onChangeImage(e)}
                  accept="image/*"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
          </div>
          
          {this.state.file!==undefined && <img src={URL.createObjectURL(this.state.file)} className="img-thumbnail mb-" alt="..."></img>}
          
          <div className="form-group">
            <label className="font-italic h5 d-inline title-margin">Description</label>
            <textarea id="desc" className="form-control" rows="5" placeholder="Your Recipe Description" value={this.state.desc} onChange={e=>this.onChangeText(e)}/>
          </div>
          <div className="form-group">
            <label className="font-italic h5 d-inline title-margin">Ingredients</label>
            <div className="input-group d-flex justify-content-center">
              <button type="button" onClick={(e)=>this.addIngredient(e)}className="btn btn-outline-success btn-sm d-inline m-1">Add Ingredients</button>  
            </div>
            {ing_rows}
          </div>
          <div className="form-group">
            <label className="font-italic h5 d-inline title-margin">Instructions</label>
            <div className="input-group d-flex justify-content-center">
              <button type="button" onClick={(e)=>this.addInstruction(e)}className="btn btn-outline-success btn-sm m-1">Add Instructions</button> 
            </div>
            {ins_rows}
          </div>

          <div className="form-group">
            <label className="font-italic h5 d-inline title-margin">Meal-Type</label>
            <select id="inputType" className="form-control" onChange={(e)=>this.onChangeType(e)} value={this.state.chosen}>
            <option selected>{this.state.chosen}</option>
            {options}
            </select>
          </div>
          {this.state.edit && <div><a href={`/contributor/view/${this.state.id}`}><button type="button" className="btn btn-danger mr-3">Cancel</button></a><button type="button" className="btn btn-primary" onClick={e=>this.onSubmit(e)}>Save</button></div>}
          {this.state.edit===false &&<div><button type="button" className="btn btn-primary" onClick={e=>this.onSubmit(e)}>Confirm</button></div>}
        </form>
        {!this.props.loggedIn && <Redirect to="/"/>}
        {this.props.posted&&(window.location.href = "/contributor")}
        {this.props.saved&&(window.location.href = "/contributor")}
      </div>
		)
	}
}

const mapStateToProps = state=>({
  recipe: state.recipes.user_item,
  category: state.recipes.category,
  loggedIn: state.users.loggedIn,
  success: state.recipes.success,
  posted: state.recipes.posted,
  saved: state.recipes.saved
})

export default connect(mapStateToProps, {getRecipe, giveRecommendation,createRecipe, checkLoggedIn, editRecipe})(PostRecipe)
