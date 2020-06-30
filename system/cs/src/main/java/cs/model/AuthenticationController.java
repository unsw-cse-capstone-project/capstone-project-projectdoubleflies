package cs.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {
	@Autowired
	UserService userService;
	
	@PostMapping("/login")
	@ResponseBody
	public boolean login(@RequestParam String username, @RequestParam String password) {
		if (userService.loginSuccessful(username, password) == true) {
			return true;
		} else {
			return false;
		}
	}

	@PostMapping("/register")
	@ResponseBody
	public boolean register(@RequestParam String username, @RequestParam String password) {
		if (userService.registerSuccessful(username, password) == true) {
			return true;
		} else {
			return false;
		}
	}
}
