package cs.model;
import java.util.List;
import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.EqualsAndHashCode;



@Entity
@Table(name = "User")
@EqualsAndHashCode(callSuper = false)
public class User{
    
    @Id
    @Column(name = "username", updatable=false)
    @NotNull
    private String username;
    
    @NotNull
    @Column(name = "password")
    private String password;
    
//    @JsonManagedReference
//    @OneToMany(fetch = FetchType.LAZY, targetEntity=Recipe.class, mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval=true)
//    private List<Recipe> recipes;
    
    public User() {}
    
//    public User(String id) {
//    	this.username=id;
//    }
    
    public User(String id, String password) {
    	this.username = id;
    	this.password =  password;
    }

    public void setID(String id){
        this.username = id;
    }

    public String getID(){
        return this.username;
    }

    public void setPassword(String pass){
        this.password = pass;
    }

    public String getPassword(){
        return this.password;
    }
//
//    public List<Recipe> getRecipe(){
//        return this.recipes;
//    }
//    
//    public List<Recipe> Recipe(List<Recipe> recipes){
//        return this.recipes = recipes;
//    }
}
