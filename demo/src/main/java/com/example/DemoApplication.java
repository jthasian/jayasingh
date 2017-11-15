package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.model.User;
import com.example.repository.UserRepository;

@SpringBootApplication
public class DemoApplication {
	
	private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner setup(UserRepository userRepository) {
		return (args) -> {
//			userRepository.save(new User("Gustavo", "Ponce", true));
//			userRepository.save(new User("John", "Smith", true));
//			userRepository.save(new User("Jim ", "Morrison", false));
//			userRepository.save(new User("David", "Gilmour", true));
//			logger.info("The sample data has been generated");
		};
	}
}