package cs.model;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;

@Embeddable
public class Ingredient {
	@NotNull
	@NotEmpty
	private String ingredient;
	@NotNull
	@NotEmpty
	private String category;
	@NotNull
	@NotEmpty
	private String amount;
	
	public Ingredient() {}
	
	public Ingredient(String ingredient, String category, String amount) {
		this.amount = amount;
		this.ingredient = ingredient;
		this.category = category;
	}
	public String getIngredient() {
		return ingredient;
	}
	public void setIngredient(String ingredient) {
		this.ingredient = ingredient;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	
	@Override
	public String toString() {
		return this.ingredient+" "+this.amount+" "+this.category;
	}

}
