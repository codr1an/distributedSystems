package com.ecommerce.valdivian.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class EncryptingService {

    private int saltRoudns = 10;
    private String salt;

    @PostConstruct
    public void PostConstruct() {
        salt = BCrypt.gensalt(saltRoudns);
    }

    public String encryptPassword(String password) {
        return BCrypt.hashpw(password, salt);
    }

    public boolean verifyPassword(String password, String hash) {
        return BCrypt.checkpw(password, hash);
    }
}
