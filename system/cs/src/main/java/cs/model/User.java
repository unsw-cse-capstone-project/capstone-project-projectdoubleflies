package cs.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.EqualsAndHashCode;



@Entity
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "favorite_recipe"})
public class User{
    
    @Id
    @Column(name = "username", updatable=false)
    @NotNull
    private String username;
    
    @NotNull
    @Column(name = "password")
    private String password;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Recipe> recipes = new ArrayList<>();

   
    
    @ManyToMany
    @JoinTable(
        name="Explorer_Info",
        joinColumns = @JoinColumn(name="username",foreignKey = @javax.persistence.ForeignKey(name = "none")),
        inverseJoinColumns = @JoinColumn(name="favorite_recipe"))
    @JsonIgnore
    private Set<Recipe> favorite_recipe = new HashSet<>();
    
    public User() {}
    
    
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

    public List<Recipe> getRecipe(){
        return this.recipes;
    }

    
    
    public void addFavorite(Recipe recipe){
        this.favorite_recipe.add(recipe);
        recipe.getUsers().add(this);
    }

    public void removeFavorite(Recipe recipe){
        this.favorite_recipe.remove(recipe);
        recipe.getUsers().remove(this);
    }
    
    public Set<Recipe> favorite(){
    	return this.favorite_recipe;
    }
    
    @Override
    public int hashCode(){
        return username.hashCode();
    }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if(o ==  null) return false;
        if(this.getClass() != o.getClass()) return false;
        User user = (User) o;
        return user.username ==  username && user.password == password;
    }
}
