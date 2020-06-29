package com.example.ingredient;

import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.util.IdUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class IngredientApplication {

    public static void main(String[] args) {
        SpringApplication.run(IngredientApplication.class, args);
    }


    @Bean
    public Snowflake getSnowflake(){
        return IdUtil.createSnowflake(1, 1);
    }

    @Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
