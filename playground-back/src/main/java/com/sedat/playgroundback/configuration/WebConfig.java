package com.sedat.playgroundback.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	/*@Override currently done in AppCorsFilter
	public void addCorsMappings(CorsRegistry registry) {
		System.out.println("###########IN WEB CONFIG ############");
		registry.addMapping("*")		
			.allowedOrigins("http://localhost:4200")
			.allowedMethods("GET", "DELETE","PUT","POST")
			.allowedHeaders("Origin", "Content-Type", "Accept")
			.exposedHeaders("Access-Control-Allow-Origin")
			.allowCredentials(true).maxAge(3600);
	}*/
	
}
