package cs.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs.model.User;
import cs.model.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	
	public boolean loginSuccessful(String username, String password){
		User user = userRepository.findByUsername(username);
		if (user != null) {
			if (user.getPassword().equals(password))
				return true;
		}
		return false;
	}
	
	public boolean registerSuccessful(String username, String password){
		User user = userRepository.findByUsername(username);
		if (user == null) {
			userRepository.save(new User(username, password));
			return true;
		}
		return false;
	}
}
