package com.example.ingredient.dao;

import com.example.ingredient.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author
 * @email
 * @description
 */

public interface UserDao extends JpaRepository<User,String>, JpaSpecificationExecutor<User> {

    User findUserByEmail(String email);

}
