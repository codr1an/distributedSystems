package com.ecommerce.valdivian.service;

import com.ecommerce.valdivian.model.LoginBody;
import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.dto.UpdateUserDTO;
import com.ecommerce.valdivian.model.RegistrationBody;
import com.ecommerce.valdivian.repository.UserRepository;

import java.util.Optional;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EncryptingService encryptingService;
    private final JwtService jwtService;

    public ResponseEntity<User> registerUser(RegistrationBody userDto) {
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            log.debug("E-Mail already registered: {}", userDto.getEmail());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        log.debug("Checking if email already exists");
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            log.debug("Email already exists: {}", userDto.getEmail());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        String encryptedPassword = encryptingService.encryptPassword(userDto.getPassword());

        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setAddress(userDto.getAddress());
        user.setPassword(encryptedPassword);

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    public ResponseEntity<User> updateUser(Long id, UpdateUserDTO updatedUserDto) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setEmail(updatedUserDto.getEmail());
            user.setName(updatedUserDto.getName());
            user.setAddress(updatedUserDto.getAddress());

            if (updatedUserDto.getPassword() != null && !updatedUserDto.getPassword().isEmpty()) {
                String encryptedPassword = encryptingService.encryptPassword(updatedUserDto.getPassword());
                user.setPassword(encryptedPassword);
            }

            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public String loginUser(@Valid LoginBody loginBody) {
        Optional<User> opUser = userRepository.findByEmail(loginBody.getEmail());
        if (opUser.isPresent()) {
            User user = opUser.get();
            if (encryptingService.verifyPassword(loginBody.getPassword(), user.getPassword())) {
                return jwtService.generateJWT(user);
            }
        }
        return null;
    }
}
