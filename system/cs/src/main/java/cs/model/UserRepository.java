package cs.model;


import java.util.*;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import cs.model.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    
	@Query("SELECT u FROM User u WHERE u.username=?1")
    User findByUsername(String username);
    
   // @Query(value="INSERT Explorer_Info (username, favorite_recipe) VALUES (?1,?2)", nativeQuery=true)
   // void addFavorite(String username, Integer id); 
//    @Query("select  r.recipeID , r.title, r.description, r.type, ing.ingredient, ing.category, ing.amount, ins.instruction from User u, Recipe r, ingredient_info ing, instruction_info ins where u.favorite_recipe=r.recipeID AND r.recipeID= ing.recipeID AND r.recipeID=ins.recipeID AND u.username=username")
//     Set<Recipe> showFavoriteRecipe(@Param("username") String username);
    //@Query("SELECT r FROM favorite_recipe WHERE username='?1'")
    //List<Recipe> showFavoriteRecipe(/*@Param("username")*/String username);
	/*@Query("SELECT r.description, r.title, r.type FROM Recipe r JOIN r.likes u WHERE u.username=?1")
	List<Recipe> showFavoriteRecipe(String username);*/

}
