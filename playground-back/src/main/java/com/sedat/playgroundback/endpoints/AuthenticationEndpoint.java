package com.sedat.playgroundback.endpoints;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sedat.playgroundback.configuration.AppAuthenticationProvider;
import com.sedat.playgroundback.model.Authorities;
import com.sedat.playgroundback.model.Users;
import com.sedat.playgroundback.repository.AuthoritiesRepository;
import com.sedat.playgroundback.repository.UsersRepository;

@RestController
@RequestMapping("/authentication")
public class AuthenticationEndpoint {
	
	@Autowired
	private UsersRepository rep;
	
	@Autowired
	private AuthoritiesRepository authrep;
	
	@Autowired
	private AppAuthenticationProvider authprovider;
	
	@PostMapping("/login")
	public ResponseEntity<Authentication> logInUser(@RequestBody Users user) {
		Authentication auth = this.authprovider.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
		if(auth != null) {
			return ResponseEntity.ok(auth);
		}
		return ResponseEntity.status(403).build();
	}
	
	@PostMapping("/register")
	public ResponseEntity<Users> registerUser(@RequestBody Users user) {
		if(user != null) {
			this.setUserRole(user, "ROLE_USER");
			//hard code it for now
			user.setEnabled(true);
			Users result = this.rep.findById(this.rep.save(user).getId()).get();
			if(result != null) {
				return ResponseEntity.ok(result);
			}			
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
	}
	
	private void setUserRole(Users user, String role) {
		List<Authorities> auths = new ArrayList<>();
		Authorities auth = new Authorities(role);
		auths.add(auth);
		user.setAuthorities(auths);
		this.authrep.save(auth);
	}

}
