package cs.model;
import java.util.*;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class SearchHistory {
    @Converter
    public static class StringListConverter implements AttributeConverter<List<String>, String> {

		@Override
		public String convertToDatabaseColumn(List<String> attribute) {
			return String.join(",", attribute); 
		}

		@Override
		public List<String> convertToEntityAttribute(String dbData) {
			return new ArrayList<>(Arrays.asList(dbData.split(",")));
		}
		
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long searchID;
    
    @ElementCollection
    @CollectionTable(name= "searchistory_Info",  joinColumns = @JoinColumn(name = "searchID"))
    @Column(name="ingredient")
    private List<String> Ingredients;
    
  
    private Integer frequency;
  
    @Column
    @Convert(converter = StringListConverter.class)
    @JsonIgnore
    private List<String> meal;
	    
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
		return this.Ingredients;
	}
   
	public void setIngredients(List<String> ingredients) {
		this.Ingredients = ingredients;
		this.setMeal(ingredients);
		this.setFrequency(1);
	}
    
	

	public Integer getFrequency() {
		return frequency;
	}

	public void setFrequency(Integer frequency) {
		this.frequency = frequency;
	}
	
	@JsonIgnore
	public List<String> getMeal() {
		return meal;
	}

	public void setMeal(List<String> meal) {
		this.meal = meal;
	}
	
	
}
