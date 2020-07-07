package cs.model;
import java.util.*;
import javax.persistence.*;

@Entity
public class SearchHistory {
    @Converter
    public static class StringListConverter implements AttributeConverter<List<String>, String> {

		@Override
		public String convertToDatabaseColumn(List<String> attribute) {
			// TODO Auto-generated method stub
			return String.join(",", attribute); 
		}

		@Override
		public List<String> convertToEntityAttribute(String dbData) {
			// TODO Auto-generated method stub
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
    
   // @ElementCollection
   // @CollectionTable(name= "history_frequency1")
  //  @MapKeyJoinColumn(name="searchID2")
    //@Column(name="frequency3")
    private Integer frequency;
    /*-------------------Test---------------------------------------------------*/
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
   
	// if this is first time to search the set of ingredients
	public void setIngredients(List<String> ingredients) {
		this.Ingredients = ingredients;
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
