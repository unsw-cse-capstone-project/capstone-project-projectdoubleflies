package com.example.ingredient.controller;

import com.example.ingredient.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author
 * @email
 * @description
 */

@Controller
@RequestMapping("/ingredient")
public class IngredientController {


    @Autowired
    private IngredientService ingredientService;
}
