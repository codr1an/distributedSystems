package com.ecommerce.valdivian.controller;

import com.ecommerce.valdivian.dto.UpdateUserDTO;
import com.ecommerce.valdivian.model.*;
import com.ecommerce.valdivian.repository.UserRepository;
import com.ecommerce.valdivian.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegistrationBody userDto) {
        return userService.registerUser(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginBody loginBody) {
        String jwt = userService.loginUser(loginBody);
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } else {
            LoginResponse response = new LoginResponse();
            response.setJwt(jwt);
            return ResponseEntity.ok(response);
        }
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById( @PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @Valid @RequestBody UpdateUserDTO updatedUserDto) {
        return userService.updateUser(id, updatedUserDto);
    }

    @PreAuthorize("hasRole('admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser( @PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public User getLoggedInUserProfile(@AuthenticationPrincipal User user) {
        return user;
    }

}
