package com.sedat.playgroundback.configuration;

//import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired 
	private AppAuthenticationProvider authProvider;
	 
	/*
	 * @Autowired private DataSource datasource;
	 */
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth)throws Exception {
		auth.authenticationProvider(this.authProvider);
		//auth.jdbcAuthentication().dataSource(this.datasource);
	}
	
	@Override
	protected void configure(HttpSecurity http)throws Exception{
		//System.out.println("################ IN APP SECURITY ###########");
		
		http.
		authenticationProvider(this.authProvider).authorizeRequests().antMatchers("/authentication/**","/h2-console/**").permitAll()
			.antMatchers("/movie-service/**").access("hasRole('USER')")
			.antMatchers("/product-service/**").access("hasRole('USER')")
			.antMatchers("/productcategory-service/**").access("hasRole('USER')")
			.anyRequest().authenticated()
			.and()
		.httpBasic().and().cors()
			//to be able to see the h2 console
			.and()
			.headers().frameOptions().disable()
			.and().csrf().disable();
		
	}

}
