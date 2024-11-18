package com.ecommerce.valdivian.controller;


import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;


    @GetMapping
    List<User> all(){
        return userRepository.findAll();
    }

    @PostMapping
    User user (@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/{id}")
    Optional<User> id(@PathVariable Long id){
        return userRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    User updateUser(@RequestBody User updatedUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setPassword(updatedUser.getPassword());
                    user.setAddress(updatedUser.getAddress());
                    user.setEmail(updatedUser.getEmail());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

}
