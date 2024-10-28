package com.ecommerce.valdivian.controller;


import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;


    @GetMapping("/api/users")
    List<User> all(){
        return userRepository.findAll();
    }

    @PostMapping("/api/users")
    User user (@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/api/users/{id}")
    Optional<User> id(@PathVariable Long id){
        return userRepository.findById(id);
    }

    @DeleteMapping("/api/users/{id}")
    void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }
}
