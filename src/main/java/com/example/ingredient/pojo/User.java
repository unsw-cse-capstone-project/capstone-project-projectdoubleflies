package com.example.ingredient.pojo;

import lombok.Data;
import org.springframework.context.ApplicationContext;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author
 * @email
 * @description 用户表实体类
 */
@Data
@Entity
public class User implements Serializable {

    @Id
    @Column(name = "user_id")
    private String userId;//             varchar(64) not null,

    private String email;

    private String password;//             varchar(64),


}
