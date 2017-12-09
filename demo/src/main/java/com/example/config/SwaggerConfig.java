package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
	public Docket productApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.example.controller"))
				.paths(regex("/v1/api/user.*")).build().apiInfo(metaData());
	}

	private ApiInfo metaData() {
		ApiInfo apiInfo = new ApiInfo("User Registration REST API", "User Registration REST API User Registration ", "1.0",
				"Terms of service",
				new Contact("Test", "https://springframework.guru/about/", "test@test.com"),
				"Apache License Version 2.0", "https://www.apache.org/licenses/LICENSE-2.0");
		return apiInfo;
	}
	
	
//	@Bean
//	public Docket postsApi() {
//		return new Docket(DocumentationType.SWAGGER_2).groupName("public-api")
//				.apiInfo(apiInfo()).select().paths(postPaths()).build();
//	}
//
//	private Predicate<String> postPaths() {
//		return or(regex("/api/posts.*"), regex("/api/javainuse.*"));
//	}
//
//	private ApiInfo apiInfo() {
//		return new ApiInfoBuilder().title("JavaInUse API")
//				.description("JavaInUse API reference for developers")
//				.termsOfServiceUrl("http://javainuse.com")
//				.contact("javainuse@gmail.com").license("JavaInUse License")
//				.licenseUrl("javainuse@gmail.com").version("1.0").build();
//	}
}
