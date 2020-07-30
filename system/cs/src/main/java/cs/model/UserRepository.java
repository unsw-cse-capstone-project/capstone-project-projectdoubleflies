package cs.model;


import java.util.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import cs.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    
    @Query("SELECT u FROM User u WHERE u.username=?1")
    User findByUsername(String username);
    
}
