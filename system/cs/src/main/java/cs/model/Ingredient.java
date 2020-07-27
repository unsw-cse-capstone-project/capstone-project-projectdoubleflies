package cs.model;
import javax.persistence.Embeddable;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;

@Embeddable
public class Ingredient {
	
	@NotNull
	@NotEmpty
	@Valid
	private String ingredient;
	@NotNull
	@NotEmpty
	@Valid
	private String category;
	@NotNull
	@NotEmpty
	// @Min(value = 1, message = "Amount should not be less than 1")
	// @Max(value = 200, message = "Amount should be less than 200")
	@Valid
	private String amount;
	
	@NotNull
	@NotEmpty
	@Valid
	private String unit;
	public Ingredient() {}
	
	public Ingredient(String ingredient, String category, String amount, String unit) {
		// TODO Auto-generated constructor stub
		this.amount = amount;
		this.ingredient = ingredient;
		this.category = category;
		this.unit = unit;
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
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}
	@Override
	public String toString() {
		return this.ingredient+" "+this.amount+" "+this.category;
	}

}
