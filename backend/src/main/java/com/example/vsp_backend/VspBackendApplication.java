package com.example.vsp_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class VspBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VspBackendApplication.class, args);
	}

	@Configuration
	public class WebConfig implements WebMvcConfigurer {
		@Override
		public void addResourceHandlers(ResourceHandlerRegistry registry) {
			// Serve files under /uploads/** from the uploads directory in project root
			String uploadsPath = System.getProperty("user.dir") + "/uploads/";
			registry.addResourceHandler("/uploads/**")
					.addResourceLocations("file:" + uploadsPath);
		}
	}
}
