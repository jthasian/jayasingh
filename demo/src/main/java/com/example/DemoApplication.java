package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.model.Address;
import com.example.model.User;
import com.example.repository.UserRepository;

@SpringBootApplication
@EnableMongoRepositories(basePackages = {"com.example.repository"})
public class DemoApplication {
	
	private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner setup(UserRepository userRepository) {
		return (args) -> {
			
//			userRepository.deleteAll();
//			
//			User user = new User("Rajesh", "Engimoori", true);
//			user.setEmail("test@test.com");
//			user.setUserName("raajesh");
//			user.setPhoneNumber(12345678);
//			user.setPassword("rajesh");
//			user.setRepeatPassword("rajesh");
//			Address address = new Address();
//			address.setAddressLine1("VTM Rama");
//			address.setAddressLine2("NGR Layout");
//			address.setCity("Bangalore");
//			address.setCountry("India");
//			address.setPostalCode("560068");
//			address.setState("Karnataka");
//			user.setAddress(address);
//			userRepository.save(user);
//			
//			user = new User("Jaya", "Singh", true);
//			user.setEmail("test1@test1.com");
//			user.setUserName("jayasingh");
//			user.setPhoneNumber(12345678);
//			user.setPassword("jayasingh");
//			user.setRepeatPassword("jayasingh");
//			address = new Address();
//			address.setAddressLine1("Blidvädersgatan");
//			address.setAddressLine2("Sweeden ST");
//			address.setCity("Göteborg");
//			address.setCountry("Sweeden");
//			address.setPostalCode("45678");
//			address.setState("Göteborg");
//			user.setAddress(address);
//			
//			userRepository.save(user);
//			System.out.println("Customers found with findByLastName('Smith'):");
//			System.out.println("--------------------------------");
//			user = userRepository.findByEmail("test1@test1.com");
//				System.out.println(user.getFirstName());
//			logger.info("The sample data has been generated");
		};
	}
	
	//remove _class
    @Bean
    public MongoTemplate mongoTemplate(MongoDbFactory mongoDbFactory,
                                       MongoMappingContext context) {

        MappingMongoConverter converter =
                new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory), context);
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));

        MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory, converter);

        return mongoTemplate;

    }

}