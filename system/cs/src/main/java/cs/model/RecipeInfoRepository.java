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
    
    @Query(value="SELECT * from Recipe limit 15 offset ?1", nativeQuery=true)
    List<Recipe> findAllOffset(int offset);
    
    @Query(value="SELECT r.category from ingredient_info r where r.ingredient=:ingredient group by r.ingredient, r.category having count(r.ingredient)="
    + "(SELECT count(r1.ingredient) as ct from ingredient_info r1 where r1.ingredient=:ingredient group by r1.ingredient, r1.category ORDER BY ct DESC limit 1)", nativeQuery=true)
    List<String> getSuggestion(@Param("ingredient") String ingredient);
    
    @Query(value="SELECT * from ingredient_info", nativeQuery=true)
    String getIngredients();

    @Query("SELECT r FROM Recipe r WHERE r.user.username=?1")
    List<Recipe> findByUsername(String username);
 
    @Query("select r from Recipe r where r.type=?1")
    List<Recipe> filterbyMeal(String type);

    @Query("SELECT r FROM Recipe r WHERE r.recipeID=?1")
    Recipe findRecipeById(Integer id);

    @Query(value="SELECT distinct(i.category) from ingredient_info i", nativeQuery=true)
    List<String> test();

    @Query(value="SELECT distinct(i.ingredient) from ingredient_info i WHERE i.category=:category", nativeQuery = true)
    List<String> test1(@Param("category") String category);
    
    @Query(value="SELECT  FROM ingredient_info i",nativeQuery=true)
    List<Ingredient> search();
    
    @Query(value="select ingredient from " +
    		"( " + 
    		"select ii.ingredient, COUNT(ii.ingredient) " + 
    		"from ingredient_info ii " + 
    		"where ii.recipeid in " + 
    		"( " + 
    		"select ii.recipeid as rid " + 
    		"from ingredient_info ii " + 
    		"group by ii.recipeid " + 
    		"having GROUP_CONCAT(concat(\",\", trim(ii.ingredient), \",\") order by trim(ii.ingredient) ASC separator '') LIKE ?1 " + 
    		"order by ii.recipeid ASC " + 
    		") " + 
    		"group by ii.ingredient " + 
    		"having ?1 NOT LIKE concat(\"%,\", trim(ii.ingredient) ,\",%\")" +
    		"order by COUNT(ii.ingredient) DESC " +
    		") as v3 " +
    		"limit 1", nativeQuery=true)
    String suggestIngredient(String ingredientsSearch);
    
  @Query(value="select * from Recipe where recipeid IN (select recipeid from (select r.recipeid, "
    		+ "count(distinct i.ingredient) as ct from Recipe r join ingredient_info i on r.recipeid=i.recipeid "
    		+ "join (select i2.ingredient from ingredient_info i2 where i2.ingredient IN :ingredients) as t "
    		+ "on i.ingredient=t.ingredient group by r.recipeid having "
    		+ "count(distinct i.ingredient)>=(select count(distinct i3.ingredient) "
    		+ "from ingredient_info i3 where i3.ingredient IN :ingredients) ORDER BY ct) as t2) and type=:types", nativeQuery = true)
    List<Recipe> ing(@Param("types") String type, @Param("ingredients") List<String> ingredients);
    
    
    @Query(value="select * from Recipe where recipeid IN (select recipeid from (select r.recipeid, "
    		+ "count(distinct i.ingredient) as ct from Recipe r join ingredient_info i on r.recipeid=i.recipeid "
    		+ "join (select i2.ingredient from ingredient_info i2 where i2.ingredient IN :ingredients) as t "
    		+ "on i.ingredient=t.ingredient group by r.recipeid having "
    		+ "count(distinct i.ingredient)>=(select count(distinct i3.ingredient) "
    		+ "from ingredient_info i3 where i3.ingredient IN :ingredients) ORDER BY ct) as t2)", nativeQuery = true)
    List<Recipe> filter(@Param("ingredients") List<String> ingredients);

}
