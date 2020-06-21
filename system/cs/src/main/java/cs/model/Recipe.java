package cs.model;
import java.util.List;
import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.EqualsAndHashCode;


@Entity
// @Table(name="recipe_info")
// @Embeddable
@EqualsAndHashCode(callSuper = false)
public class Recipe{

	@Id
	@GeneratedValue
	@Column(name = "recipeID")
	private Integer recipeID;

//	@NotEmpty
//	@Valid
	@ElementCollection
	@CollectionTable(
			name="ingredient_info",
			joinColumns=@JoinColumn(name="recipeID")
	)
	@Column(nullable=false)
	private List<Ingredient> ingredients;
	
//	@NotEmpty
	@ElementCollection
	@CollectionTable(
			name="instruction_info", 
			joinColumns=@JoinColumn(name="recipeID")
	)
	@Column(name="instruction", nullable=false)
	private List<@Size(min=1) String> instructions;
	
	
	@ManyToOne(fetch=FetchType.LAZY, cascade = {CascadeType.MERGE})
	@JoinColumn(name="username")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JsonBackReference
	private User user;
	
	
	@NotNull
	@Length(min=2)
	private String title;

	@NotNull
	@Length(min=2)
	private String description;
	
	@NotNull
	@Length(min=2)
	private String type;
	
	public Recipe() {}
	
	// public Recipe(String title, String description, List<Ingredient> ingredients, List<String> instructions, String type) {
	// 	this.title = title;
	// 	this.description = description;
	// 	this.ingredients = ingredients;
	// 	this.instructions = instructions;
	// 	this.type = type;
	// }

	public Recipe(String title, String description, List<Ingredient> ingredients, List<String> instructions, String type, User user) {
		// this.recipeID = id;
		this.title = title;
		this.description = description;
		this.ingredients = ingredients;
		this.instructions = instructions;
		this.type = type;
		this.user = user;
	}
	
	public Integer getRecipeID() {
		return recipeID;
	}

	public void setRecipeID(Integer recipeID) {
		this.recipeID = recipeID;
	}

	public List<String> getInstructions() {
		return instructions;
	}

	public void setInstructions(List<String> instructions) {
		this.instructions = instructions;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}


	
//	private Set<String> ingredients = new LinkedHashSet<String>();
//	private Set<String> categories = new LinkedHashSet<String>();
	
//	public Recipe(Set<String> ingredients) {
//		this.ingredients = ingredients;
//	}
//	public Recipe(Integer recipeID, List<String> ingredients) {
//		this.recipeID = recipeID;
//		this.ingredients = ingredients;
//	}
	
//	public Set<String> getIngredients() {
//		return ingredients;
//	}
//	public void setIngredient(Set<String> ingredients) {
//		this.ingredients = ingredients;
//	}
//	
//	public Set<String> getCategories() {
//		return categories;
//	}
//	public void setCategories(Set<String> categories) {
//		this.categories = categories;
//	}
//	
//	
//	@Override
//	public String toString() {
//		String str_ing = "[";
//		String str_cate = "[";
//		for (String elem : this.ingredients) {
//            str_ing = str_ing+elem+',';
//        
//        }
//		
//		for (String elem: this.categories) {
//			str_cate = str_cate+elem+',';
//		}
//		str_ing = str_ing.substring(0, str_ing.length() - 1);
//		str_ing = str_ing + ']';
//		
//		str_cate = str_cate.substring(0, str_cate.length() - 1);
//		str_cate = str_cate + ']';
//		
//		return "Recipe{" + 
//				"Id=" + recipeID.toString() + '\'' + 
//				", ingredients=" + str_ing  + '\'' + 
//				", categories=" + str_cate + '\'' + "}";
//	}
	

