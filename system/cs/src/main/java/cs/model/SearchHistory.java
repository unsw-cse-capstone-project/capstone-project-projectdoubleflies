package cs.model;
import java.util.*;
import javax.persistence.*;

@Entity
public class SearchHistory {
		
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long searchID;
    
    @ElementCollection
    @CollectionTable(name= "searchistory_Info",  joinColumns = @JoinColumn(name = "searchID"))
    @Column(name="ingredient")
    private List<String> Ingredients;
	    
    public SearchHistory() {}

	public Long getSearchID() {
		return searchID;
	}

	public void setSearchID(Long searchID) {
		this.searchID = searchID;
	}
    
	public void addIngredient(String ingredient) {
		this.Ingredients.add(ingredient);
	}
	
	public void removeIngredient(String ingredient) {
		this.Ingredients.remove(ingredient);
	}
	
	public List<String> getIngredients() {
		return Ingredients;
	}

	public void setIngredients(List<String> ingredients) {
		Ingredients = ingredients;
	}
}
