package cs.model;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
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
import org.springframework.web.multipart.MultipartFile;

import cs.model.Recipe;
import cs.model.User;
import cs.model.RecipeInfoRepository;
import cs.model.UserRepository;
import cs.model.ImageRepository;
import com.google.gson.Gson;
import java.math.BigInteger;


@RestController
@Transactional
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RecipeController {
	public static class Wrapper{
		public String type;
		public List<String> ingredients;
		
	}
	@Autowired
	RecipeInfoRepository recipeInfoRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	searchRepository searchrepo;
	@Autowired
	ImageRepository imgRepository;


	@GetMapping("/recipeidea")
	public Map<BigInteger, List<String>> search(){
		List<BigInteger> searchIDs=searchrepo.search_history();
		Map<BigInteger, List<String>> map=new HashMap<>();
		for(BigInteger id: searchIDs){
			List<String> ing=searchrepo.history(id);
			map.put(id, ing);
		}
		return map;
	}	
	
	@GetMapping("/recipe/image/{id}")
	public ResponseEntity<Resource> getImage(@PathVariable String id) {
		Integer recipeId = Integer.parseInt(id);
		Recipe recipe = recipeInfoRepository.findRecipeById(recipeId);
		Image image = recipe.getImg();
	//	String imgID = image.getId();
		return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getFileName() + "\"")
                .body(new ByteArrayResource(image.getData()));
		
	}
	
	@GetMapping("/recipe/{id}")
	public Recipe getRecipe(@PathVariable String id) {
		int recipeID = Integer.parseInt(id);
		return recipeInfoRepository.findRecipeById(recipeID);
	}
	
	@GetMapping("/recipe")
	public List<Recipe> getAllRecipe(){
		return recipeInfoRepository.findAll();
	}
	// Recipe filtered by recipe type
	@GetMapping("/recipe/filter/{recipe}")
        public  List<Recipe> help(@PathVariable String recipe) {
    	        return recipeInfoRepository.filterbyMeal(recipe);
    	}
   
   	@GetMapping("/recipe/filterAll")
    	public Map<String, List<Recipe>> filter(){
    		String[] names = new String[] {"Breakfast", "Lunch","Dinner","Snack"};
    		Map<String, List<Recipe>> result = new HashMap<>();
    		for(String type : names) {
    			List<Recipe> res = recipeInfoRepository.filterbyMeal(type);
    			result.put(type, res);
    		}
    		return result;
    	
    	}

    @RequestMapping("/recipe/find")
    public List<Recipe> findByname(@RequestParam String username){
        return recipeInfoRepository.findByUsername(username);
        //return "saved";
    }
	
	
     @PostMapping("/recipe/{username}/{imgID}")
     public @ResponseBody String addRecipe(@Valid @RequestBody Recipe recipe , @PathVariable String username, @PathVariable String imgID) {
 	    User user = userRepository.findByUsername(username);
 	    Image img = imgRepository.findOne(imgID);
		recipe.setUser(user);
		recipe.setImg(img);
		recipeInfoRepository.save(recipe);
		
        return "saved";
      }
	
     @PostMapping("/{id}/imagechange/{imgID}")
     public @ResponseBody String changeImage(@PathVariable String id, @PathVariable String imgID) {
		Integer recipeId = Integer.parseInt(id);
		Recipe recipe = recipeInfoRepository.findRecipeById(recipeId);
	    Image origin = recipe.getImg();
		if(origin != null) imgRepository.delete(origin.getId());
		Image img = imgRepository.findOne(imgID);
		recipe.setImg(img);
		return "image changed";
     }

    @PutMapping("/recipe/{id}")
    public Recipe editRecipe(@RequestBody Recipe newRecipe, @PathVariable String id){
           Integer recipeID = Integer.parseInt(id);
		   Recipe recipe = recipeInfoRepository.findRecipeById(recipeID);
		   System.out.println(newRecipe.getIngredients());
		   System.out.println(newRecipe.getInstructions());
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
	public @ResponseBody String deleteRecipe(@PathVariable String id){
		int recipeID = Integer.parseInt(id);
		Recipe recipe = recipeInfoRepository.findOne(recipeID);
		recipeInfoRepository.deleteByRecipeID(recipeID);
		return "recipe and image deleted";
	}
	// @DeleteMapping("/recipe/{id}")
	// public @ResponseBody String deleteRecipe(@PathVariable String id){
	// 	int recipeID = Integer.parseInt(id);
	// 	Recipe recipe = recipeInfoRepository.findOne(recipeID);
	// 	Image img = recipe.getImg();
	// 	recipeInfoRepository.deleteByRecipeID(recipeID);
	// 	imgRepository.delete(img.getId());
	// 	return "recipe and image deleted";
	// }


	@GetMapping("/recipe/ingredient/{ingredient}")
	public String getSuggestion(@PathVariable String ingredient) {
		List<String> temp = recipeInfoRepository.getSuggestion(ingredient);
		if(temp.size()!=0)
			return recipeInfoRepository.getSuggestion(ingredient).get(0);
		else
			return null;
	}

   @GetMapping("/favorite/user")
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
    }
    // search with recipe and also store in search history table
    @PostMapping("/search")
    public @ResponseBody List<Recipe> recipeSearch(@RequestBody Wrapper wrap) {
		System.out.println("type");
		System.out.println(wrap.type);
    	if((wrap.type == null || wrap.type.length() == 0)&&(wrap.ingredients == null || wrap.ingredients.size() == 0)) return recipeInfoRepository.findAll();
    	else if(wrap.type == null || wrap.type.length() == 0) {
    		this.addSearch(wrap.ingredients);
    		return recipeInfoRepository.filter(wrap.ingredients);
    	}else if(wrap.ingredients == null||wrap.ingredients.size() == 0) {
    		return recipeInfoRepository.filterbyMeal(wrap.type);
    	}
    
    	List<Recipe> result = recipeInfoRepository.ing(wrap.type,wrap.ingredients);
    	this.addSearch(wrap.ingredients);
    	return result;
    	
    }
	
	// @PostMapping("/test1")
    // public List<Recipe> test(){
	// 	List<String> ingredients = new ArrayList<>();
	// 	ingredients.add("egg");
	// 	return recipeInfoRepository.filter(ingredients);

	// }
    public void addSearch(List<String> ingredient) {

		Collections.sort(ingredient); 
		String meal = String.join(",", ingredient);
		SearchHistory searcher=  searchrepo.helpme(meal);
		if(searcher != null) {    		
			int temp = searcher.getFrequency()+1;			
			searcher.setFrequency(temp);			
			searchrepo.save(searcher);			    	
			}else{    		
				SearchHistory refresh = new SearchHistory();    		
				refresh.setIngredients(ingredient);    		
				searchrepo.save(refresh);    	
		}
    }
    
	
    @GetMapping("/recipe/MostPopular")
    public List<BigInteger> popular(){
    	return searchrepo.search_history();
    }
    @GetMapping("/test/recipe")
    public List<List<String>> test2(){
    	List<List<String>> result = new ArrayList<>();
    	List<SearchHistory> temp = searchrepo.help();
    	List<Recipe> recipe = recipeInfoRepository.findAll();
    	for(SearchHistory his: temp) {
    	  List<String> ingre = his.getIngredients();
    	  
 
    	 List<String> t = new ArrayList<>(ingre);
    	  int flag = 1;
    	  for(Recipe r : recipe) {
    		   t.retainAll(r.ingredeintNames());
    		   int len = t.size();
    		   if(len == ingre.size()) {
    			   flag = 0;
    		   }   
    	  }
    	  if(flag ==1) {
    		  result.add(ingre);
    	  }
    	}
    	return result;
    	
    }
    
    // @GetMapping("/test")
    // public List<SearchHistory> helper() {
    	
    // 	return searchrepo.help();
    // }

    // @GetMapping("/search/{id}")
    // public List<String> historyResult(@PathVariable Long id){
    //     return searchrepo.history(id);
    // }

   @GetMapping("/favorite/{username}")
//     public Set<Recipe> showMyFavorite(@PathVariable String username){
    public List<Recipe> showMyFavorite(@PathVariable String username){
       List<Recipe> result = new ArrayList<>();
       User user = userRepository.findByUsername(username);
       for(Recipe r : user.favorite()) {
    	   result.add(r);
       }
       return result;
    	//return userRepository.showFavoriteRecipe(username);
    }
    // return ingredient by category ------Brute Force-----------
	@GetMapping("/search/ingredient")
	public Map<String, List<String>> test1(){
		Map<String, List<String>> map = new HashMap<>();
		List<String> categories=recipeInfoRepository.test();
		for(String c:categories){
			map.put(c, recipeInfoRepository.test1(c));
		}
		return map;
	}
	
	@GetMapping("/search/popularNoMatch")
	public Map<BigInteger, List<String>> popularNoMatch(){
		List<BigInteger> popularNoMatchID = searchrepo.popularSearchNoMatch();
		Map<BigInteger, List<String>> map=new HashMap<>();
		for(BigInteger id: popularNoMatchID){
			List<String> ing=searchrepo.history(id);
			map.put(id, ing);
		}
		return map;
	}
	
    // public Map<String, List<Ingredient>> test(){
    // 	Set<String> name = new HashSet<>();
    // 	Map<String, List<Ingredient>> map = new HashMap<>();
    // 	List<Recipe> recipe = recipeInfoRepository.findAll();
    // 	for(Recipe r : recipe) {
    // 		for(Ingredient ingre : r.getIngredients()) {
    // 			if(!name.contains(ingre.getCategory())) {
    // 				name.add(ingre.getCategory());
    // 				map.put(ingre.getCategory(), new ArrayList<>());
    // 			}
    // 			map.get(ingre.getCategory()).add(ingre);
    // 		}
    // 	}
    // 	/*Ingredient i = new Ingredient("egg","diary","10");
    // 	Ingredient g = new Ingredient("milk","diary","10");
    // 	List<Ingredient> l = new ArrayList<>();
    // 	l.add(i);
    // 	l.add(g);
    // 	map.put("diary", l);*/
    // 	return map;
    // }
	
	@PostMapping("/suggest/ingredient")
	public String suggestIngredient(@RequestBody List<String> selectedIngredients) {
		Collections.sort(selectedIngredients);
		String searchStr = String.join(",%,", selectedIngredients);
		searchStr = "%," + searchStr + ",%";
		String result = recipeInfoRepository.suggestIngredient(searchStr);
		return result;
	}
	
    @PostMapping("/recommend/recipe")
    public List<Recipe> recommendRecipe(@RequestBody List<String> ingredient){
    	List<Recipe> recipe = recipeInfoRepository.findAll();
    	Comparator<Recipe> recipeCompare = new Comparator<Recipe>() {
    		@Override
    		public int compare(Recipe r1, Recipe r2) {
    			ArrayList<String> t1 = new ArrayList<>(ingredient);
    			t1.retainAll(r1.ingredeintNames());
    			int len1 = t1.size();
    			ArrayList<String> t2 = new ArrayList<>(ingredient);
    			t2.retainAll(r2.ingredeintNames());
    			int len2 = t2.size();
    			if(len1 == len2) {
    				return r1.ingredeintNames().size() - r2.ingredeintNames().size();
    			}else {
    				return len2 -len1;
    			}
    		}
    	};
    	PriorityQueue<Recipe> res = new PriorityQueue<>(recipeCompare);
    	for(Recipe r : recipe) {
    		List<String> temp = new ArrayList<>(ingredient);
    		temp.retainAll(r.ingredeintNames());
    		if(temp.size() == 0) continue;
    		else {
    		    res.add(r);
    		}
    	}
    	List<Recipe> result = new ArrayList<>();
    	while(!res.isEmpty()) {
    		result.add(res.remove());
    	}
    	
    	return result;
    }
    
}


