package com.sedat.playgroundback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.sedat.playgroundback"})
public class PlaygroundBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlaygroundBackApplication.class, args);
	}

}
