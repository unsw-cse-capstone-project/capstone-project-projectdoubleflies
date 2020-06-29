package com.example.ingredient.controller;

import com.example.ingredient.pojo.Cart;
import com.example.ingredient.pojo.Ingredient;
import com.example.ingredient.pojo.Recipe;
import com.example.ingredient.pojo.User;
import com.example.ingredient.service.CartService;
import com.example.ingredient.service.IngredientService;
import com.example.ingredient.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

// 处理页面映射
@Controller
public class PageController {

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private RecipeService recipeService;

    // 首页映射
    @RequestMapping("/")
    public String index(Model model) {

        Page<Ingredient> ingredientPage = ingredientService.categoryPaging(1, 50, "vegetables");

        model.addAttribute("vegetables", ingredientPage.getContent());

        Page<Ingredient> ingredientPage2 = ingredientService.categoryPaging(1, 15, "grains");

        model.addAttribute("grains", ingredientPage2.getContent());


        Page<Ingredient> ingredientPage3 = ingredientService.categoryPaging(1, 15, "seasoning");

        model.addAttribute("seasoning", ingredientPage3.getContent());


        Page<Recipe> recipePage = recipeService.paging(1, 3);

        model.addAttribute("recipeList", recipePage.getContent());


        return "index";
    }


    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/register")
    public String register() {
        return "register";
    }


    @Autowired
    private HttpSession session;

    @Autowired
    private CartService cartService;

    @RequestMapping("/cart")
    public String cart(Model model) {

        User user = (User) session.getAttribute("user");

        if (user == null) {
            return "login";
        }

        Cart cart = cartService.findCartByUserId(user.getUserId());

        model.addAttribute("cart", cart);

        return "cart";

    }


    @RequestMapping("/recipe")
    public String recipe(Model model) {

        Page<Recipe> recipePage = recipeService.paging(1, 4);

        Random random = new Random();

        int n = random.nextInt(recipePage.getContent().size());

        Recipe recipe = recipePage.getContent().get(n);

        model.addAttribute("item", recipe);

        return "recipe";
    }


}
