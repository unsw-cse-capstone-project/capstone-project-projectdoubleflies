package cs.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import cs.model.Recipe;
import cs.model.User;
import cs.model.RecipeInfoRepository;
import cs.model.UserRepository;
import com.google.gson.Gson;


@RestController
@Transactional
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RecipeController {
	
	@Autowired
	RecipeInfoRepository recipeInfoRepository;
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/recipe/{id}")
	public List<Recipe> getRecipe(@PathVariable String id) {
		int recipeID = Integer.parseInt(id);
		return recipeInfoRepository.findAllByRecipeID(recipeID);
	}
	
	@GetMapping("/recipe")
	public List<Recipe> getAllRecipe(){
		return recipeInfoRepository.findAll();
	}

    @RequestMapping("/recipe/find")
    public List<Recipe> findByname(@RequestParam String username){
        return recipeInfoRepository.findByUsername(username);
        //return "saved";
    }
	
/*	@PostMapping("/recipe/{recipeJson}")
	public Recipe adddRecipe(@PathVariable String recipeJson){
		System.out.println(recipeJson);
		Gson gson = new Gson();
		Recipe recipe = gson.fromJson(recipeJson,  Recipe.class);
		// System.out.println(recipeJson);
		return recipeInfoRepository.save(recipe);
	}*/
// 	@PostMapping("/recipe/")
// 	public Recipe addRecipe(@RequestBody Recipe recipe) {
// 		// System.out.println(recipe);
//
// 		return recipeInfoRepository.save(recipe);
// 	}
	
	@PostMapping("/recipe/")
 	public @ResponseBody String addRecipe(@RequestBody Recipe recipe) {
//		System.out.println(recipevo.getUser().getID());
//		String username = recipevo.getUsername();
//		System.out.println(username);
//		User user = userRepository.findByUsername(username);
//		System.out.println(user.getID());
//		System.out.println(user.getPassword());
//		
//		User new_user = new User(user.getID(), user.getPassword());
//		Recipe recipe = new Recipe(recipevo.getTitle(), recipevo.getDescription(), recipevo.getIngredients(), recipevo.getInstructions(), recipevo.getType(), new_user);
 	    recipeInfoRepository.save(recipe);
        return "saved";
//		return null;
 	}

    @PutMapping("/recipe/{id}")
    public Recipe editRecipe(@RequestBody Recipe newRecipe, @PathVariable String id){
           Integer recipeID = Integer.parseInt(id);
           Recipe recipe = recipeInfoRepository.findRecipeById(recipeID);
           if(recipe == null){
             newRecipe.setRecipeID(recipeID);
             //System.out.println("id:"+newRecipe.getRecipeID());
             return recipeInfoRepository.save(newRecipe);
             //return newRecipe;
           }else{
             recipe.setInstructions(newRecipe.getInstructions());
             recipe.setType(newRecipe.getType());
             recipe.setIngredients(newRecipe.getIngredients());
             recipe.setTitle(newRecipe.getTitle());
             recipe.setDescription(newRecipe.getDescription());
             return recipeInfoRepository.save(recipe);
           }
           //System.out.println(newRecipe);*/
	    /* Integer recipeID = Integer.parseInt(id);
         return recipeInfoRepository.findRecipeById(recipeID)
          .map(recipe->{
           recipe.setInstructions(newRecipe.getInstructions());
           recipe.setType(newRecipe.getType());
           recipe.setIngredients(newRecipe.getIngredients());
           recipe.setTitle(newRecipe.getTitle());
           recipe.setDescription(newRecipe.getDescription());
                       return recipeInfoRepository.save(recipe);
        })
        .orElseGet(() ->{
           newRecipe.setRecipeID(recipeID);
                       return recipeInfoRepository.save(newRecipe);			
        });*/
	}
	
	@DeleteMapping("/recipe/{id}")
	public int deleteRecipe(@PathVariable String id){
		int recipeID = Integer.parseInt(id);
		return recipeInfoRepository.deleteByRecipeID(recipeID);
	}

	@GetMapping("/recipe/ingredient/{ingredient}")
	public String getSuggestion(@PathVariable String ingredient) {
		return recipeInfoRepository.getSuggestion(ingredient);
	}
}


