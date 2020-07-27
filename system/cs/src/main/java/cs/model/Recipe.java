package cs.model;
import java.util.*;
import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;


@Entity
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "likes"})
public class Recipe{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "recipeID")
	private Integer recipeID;
    
	@NotEmpty
	@Valid
	@ElementCollection
	@CollectionTable(
			name="ingredient_info",
			joinColumns=@JoinColumn(name="recipeID")
	)
	@Column(nullable=false)
	private List<Ingredient> ingredients;
	
   	@NotEmpty
	@ElementCollection
	@CollectionTable(
			name="instruction_info", 
			joinColumns=@JoinColumn(name="recipeID")
	)
	@Column(name="instruction", nullable=false)
    	@Size(min=1 , message="You must enter at least one instruction!")
   	 @Valid
	private List<@Size(min=1) String> instructions;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="username")
   	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@JsonBackReference
	private User user;
	
   
	@ManyToMany(mappedBy="favorite_recipe")
	@JsonIgnore
   	private Set<User> likes = new HashSet<>();
	
	
    	@NotNull
	@Length(min=2, message="Title length must be at least two!")
   	 @Valid
	private String title;

	@NotNull
	@Length(min=2, message="Description length must be at least two!")
	@Valid
	@Lob
	private String description;
	
	@NotNull
	@Length(min=2,message="Type length must be at least two!")
	@Valid
	private String type;
	
	
	@OneToOne(cascade = CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="uuid")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Image img;
	
	public Recipe() {}
	
	

	public Recipe(String title, String description, List<Ingredient> ingredients, List<String> instructions, String type) {
		this.title = title;
		this.description = description;
		this.ingredients = ingredients;
		this.instructions = instructions;
		this.type = type;
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
  
	@JsonIgnore
	public List<String> ingredeintNames(){
		List<String> res = new ArrayList<>();
		for(Ingredient ing: this.getIngredients()) {
			res.add(ing.getIngredient());
		}
		return res;
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
   @JsonIgnore
   public Set<User> getUsers(){
        return this.likes;
    }
	
    @Override
    public int hashCode(){
        return this.recipeID;
    }

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(o == null) return false;
        Recipe r = (Recipe) o;
        return r.user == user;
    }
    @Override
    public String toString(){
        return "success";
    }



	public Image getImg() {
		return img;
	}



	public void setImg(Image img) {
		this.img = img;
	}
	
}


