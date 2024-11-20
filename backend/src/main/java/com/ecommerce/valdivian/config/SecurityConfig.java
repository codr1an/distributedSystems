package com.ecommerce.valdivian.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> {
                    var crs = new org.springframework.web.cors.CorsConfiguration();
                    crs.setAllowedOrigins(List.of("http://localhost:3000"));
                    crs.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    crs.setAllowedHeaders(List.of("*"));
                    return crs;
                }));

        http.addFilterBefore(jwtRequestFilter, AuthorizationFilter.class);
        http.authorizeHttpRequests()
                .requestMatchers("/api/products", "/api/products/{id}", "/api/products/type/{type}","/api/users/register", "/api/users/login", "/swagger-ui" ,"/swagger-ui/**", "/v3/api-docs/**", "/v3/api-docs").permitAll()
                .requestMatchers("/api/cart/**").authenticated()
                .anyRequest().authenticated();
        return http.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
