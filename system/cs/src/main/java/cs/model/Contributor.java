// package cs.model;
// import java.util.List;
// import javax.persistence.*;
// import javax.validation.Valid;
// import javax.validation.constraints.NotEmpty;
// import javax.validation.constraints.NotNull;
// import javax.validation.constraints.Size;

// import org.hibernate.validator.constraints.Length;



// @Entity
// @Table(name = "contributor")
// public class Contributor{
    
//     @Id
//     @GeneratedValue
//     @Column(name = "contributorID")
//     private Integer contributorID;

//     @NotEmpty
// 	@Valid
// 	@ElementCollection
// 	@CollectionTable(
// 			name="contributor_recipe",
// 			joinColumns=@JoinColumn(name="contributorID")
// 	)
//     @Column(nullable=false)
//     private List<Recipe> recipes;
    
//     public Contributor() {}
    
//     public void setID(Integer id){
//         this.contributorID = id;
//     }

//     public Integer getID(){
//         return this.contributorID;
//     }

//     public void setRecipe(List<Recipe> recipe){
//         this.recipes = recipe;
//     }
    
//     public void addRecipe(Recipe recipe){
//         this.recipes.add(recipe);
//     }

//     public void removeRecipe(Recipe recipe){
//         this.recipes.remove(recipe);
//     }
//     public List<Recipe> getRecipe(){
//         return this.recipes;
//     }
// }
