//package cs.model;
//
//import java.io.Serializable;
//import java.util.Objects;
//
//public class RecipeInfoKey  implements Serializable {
//    private Integer recipeID;
//    private String ingredient;
//    
//    public RecipeInfoKey() {}
//    
//    public RecipeInfoKey(Integer recipeID, String ingredient) {
//    	this.setRecipeID(recipeID);
//    	this.setIngredient(ingredient);
//    }
//
//	public Integer getRecipeID() {
//		return recipeID;
//	}
//
//	public void setRecipeID(Integer recipeID) {
//		this.recipeID = recipeID;
//	}
//
//	public String getIngredient() {
//		return ingredient;
//	}
//
//	public void setIngredient(String ingredient) {
//		this.ingredient = ingredient;
//	}
//	
//	@Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        RecipeInfoKey id = (RecipeInfoKey) o;
//        return recipeID.equals(id.recipeID) &&
//                ingredient.equals(id.ingredient);
//    }
//	
//	@Override
//    public int hashCode() {
//        return Objects.hash(recipeID, ingredient);
//    }
//	
//	@Override
//	public String toString() {
//		return "id=" + recipeID.toString() + "ingredient=" + ingredient;
//	}
//}
