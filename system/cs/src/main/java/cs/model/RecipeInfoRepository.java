package cs.model;
import cs.model.Recipe;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
public interface RecipeInfoRepository extends JpaRepository<Recipe, Integer> {
	
	List<Recipe> findAllByRecipeID(int recipeID);
	
    int deleteByRecipeID(Integer recipeID);
    
    @Query(value="SELECT r.category from ingredient_info r where r.ingredient=:ingredient group by r.ingredient, r.category having count(r.ingredient)="
    		+ "(SELECT count(r1.ingredient) as ct from ingredient_info r1 where r1.ingredient=:ingredient group by r1.ingredient, r1.category ORDER BY ct DESC limit 1);", nativeQuery=true)
    String getSuggestion(@Param("ingredient") String ingredient);
    
    @Query(value="SELECT * from ingredient_info", nativeQuery=true)
    String getIngredients();

    @Query("SELECT r FROM Recipe r WHERE r.user.username=?1")
    List<Recipe> findByUsername(String username);

    @Query("SELECT r FROM Recipe r WHERE r.recipeID=?1")
    Recipe findRecipeById(Integer id);
    
    //@Query("SELECT i FROM Recipe r INNER JOIN r.ingredients i WHERE i.category=")
    @Query(value="SELECT  FROM ingredient_info i",nativeQuery=true)
    List<Ingredient> search();

}
