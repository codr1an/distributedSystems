package com.ecommerce.valdivian.service;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ecommerce.valdivian.model.User;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class JwtService {

    private String secret_key = "very_secure";
    private String issuer = "valdivian";
    private int expiryInSeconds = 3600;
    private Algorithm algorithm;
    private static final String EMAIL = "EMAIL";
    private static final String ROLE_KEY = "ROLE";

    @PostConstruct
    public void postConstruct() {
        algorithm = Algorithm.HMAC256(secret_key);
    }


    public String generateJWT(User user) {
        return JWT.create()
                .withClaim(EMAIL, user.getEmail())
                .withClaim(ROLE_KEY, user.getRole())
                .withExpiresAt(new Date(System.currentTimeMillis() + (1000 * expiryInSeconds)))
                .withIssuedAt(new Date())
                .withIssuer(issuer)
                .withSubject(user.getId().toString())
                .sign(algorithm);
    }

    public String getEmail(String token) {
        return JWT.decode(token).getClaim(EMAIL).asString();
    }

}
