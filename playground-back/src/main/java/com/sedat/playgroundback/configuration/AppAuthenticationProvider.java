package com.sedat.playgroundback.configuration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.sedat.playgroundback.model.Authorities;
import com.sedat.playgroundback.model.Users;
import com.sedat.playgroundback.repository.UsersRepository;

@Service
public class AppAuthenticationProvider implements AuthenticationProvider, Serializable{

	private static final long serialVersionUID = 1L;
	
	@Autowired
	private UsersRepository rep;

	@Override
	public Authentication authenticate(Authentication auth) throws AuthenticationException {
		Users user = this.rep.authenticateUser(auth.getName(), (String) auth.getCredentials());
        if(user != null) {
        	List<GrantedAuthority> auths = new ArrayList<>();
        	for(Authorities eachAuth : user.getAuthorities()) {
        		GrantedAuthority authority = new SimpleGrantedAuthority(eachAuth.getAuthority());
        		auths.add(authority);
        	}
	        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(auth.getName(),auth.getCredentials(), auths);
	        return authenticationToken;
        }
        throw new BadCredentialsException("Username/Password does not match for " + auth.getPrincipal());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
