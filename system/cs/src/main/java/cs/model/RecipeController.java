package cs.model;

import java.util.*;

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
	@Autowired
	searchRepository searchrepo;
	
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
	
	
	@PostMapping("/recipe/")
 	public @ResponseBody String addRecipe(@RequestBody Recipe recipe) {
 	    recipeInfoRepository.save(recipe);
        return "saved";
 	}

    @PutMapping("/recipe/{id}")
    public Recipe editRecipe(@RequestBody Recipe newRecipe, @PathVariable String id){
           Integer recipeID = Integer.parseInt(id);
           Recipe recipe = recipeInfoRepository.findRecipeById(recipeID);
           if(recipe == null){
             newRecipe.setRecipeID(recipeID);
             return recipeInfoRepository.save(newRecipe);
           }else{
             recipe.setInstructions(newRecipe.getInstructions());
             recipe.setType(newRecipe.getType());
             recipe.setIngredients(newRecipe.getIngredients());
             recipe.setTitle(newRecipe.getTitle());
             recipe.setDescription(newRecipe.getDescription());
             return recipeInfoRepository.save(recipe);
           }
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

   /*@GetMapping("/favorite/user")
    public @ResponseBody String addFavorite(@RequestParam String id, @RequestParam String username){
        Integer recipeID = Integer.parseInt(id);
        User user = userRepository.findByUsername(username);
        Recipe recipe = recipeInfoRepository.findRecipeById(recipeID);
        user.addFavorite(recipe);
       // userRepository.addFavorite(username, recipeID);
        userRepository.save(user);
        
        return "saved";
    }
     @GetMapping("/favorite/{id}/delete")
    public @ResponseBody String deleteFavorite(@PathVariable String id, @RequestParam String recipeName){
        Integer recipeID = Integer.parseInt(recipeName);
        User user = userRepository.findByUsername(id);
        Recipe recipe = recipeInfoRepository.findRecipeById(recipeID);
        user.removeFavorite(recipe);
        userRepository.save(user);
        return "deleted";
    }*/
    
    @PostMapping("/search")
    public @ResponseBody String addSearch(@RequestBody List<String> ingredient) {
    	SearchHistory search = new SearchHistory();
    	search.setIngredients(ingredient);
    	searchrepo.save(search);
    	return "searched";
    }

  /* @GetMapping("/favorite/{username}")
//     public Set<Recipe> showMyFavorite(@PathVariable String username){
    public List<Recipe> showMyFavorite(@PathVariable String username){
       
    	return userRepository.showFavoriteRecipe(username);
    }*/
    
    @GetMapping("/search/ingredient")
    public Map<String, Ingredient> test(){
    	Ingredient i = new Ingredient("egg","diary","10");
    	Map<String, Ingredient> map = new HashMap<>();
    	map.put("diary", i);
    	return map;
    }
    /*public List<Ingredient> searchCategory(/*@PathVariable String id @RequestParam String name*/
    	/*Integer recipeID = Integer.parseInt(id);
    	Recipe r = recipeInfoRepository.findRecipeById(recipeID);
    	/*List<String> res = new ArrayList<>();
    	for(Ingredient m: r.getIngredients()) {
    		res.add(m.toString());
    	}
    	return res;
    	return r.getIngredients();
    	List<Recipe> recipe = recipeInfoRepository.findAll();
    	List<Ingredient> result = new ArrayList<>();
    	for(Recipe r : recipe) {
    		for(Ingredient ingre : r.getIngredients()) {
    			if(ingre.getCategory().equals("meat")) {
    				result.add(ingre);
    			}
    		}
    	}
    	return result;
    }*/
}


