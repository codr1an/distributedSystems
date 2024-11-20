package com.ecommerce.valdivian.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthCheckController {

    private final DataSource dataSource;

    @Value("${frontend.url}")
    private String frontendUrl;

    public HealthCheckController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private Map<String, Object> buildHealthResponse(String status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return response;
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/backend")
    public ResponseEntity<Map<String, Object>> checkBackend() {
        return ResponseEntity.ok(buildHealthResponse("UP", "Backend is running."));
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/database")
    public ResponseEntity<Map<String, Object>> checkDatabase() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                return ResponseEntity.ok(buildHealthResponse("UP", "Database is healthy."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(buildHealthResponse("DOWN", "Database is not reachable: " + e.getMessage()));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(buildHealthResponse("DOWN", "Database health check failed."));
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/frontend")
    public ResponseEntity<Map<String, Object>> checkFrontend() {
        try {
            var url = new java.net.URL(frontendUrl);
            var connection = (java.net.HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(2000);
            connection.setReadTimeout(2000);
            int responseCode = connection.getResponseCode();
            if (responseCode == 200) {
                return ResponseEntity.ok(buildHealthResponse("UP", "Frontend is reachable."));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(buildHealthResponse("DOWN", "Frontend is not reachable: HTTP " + responseCode));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(buildHealthResponse("DOWN", "Frontend health check failed: " + e.getMessage()));
        }
    }
    
    @PreAuthorize("hasRole('admin')")
    @GetMapping
    public ResponseEntity<Map<String, Object>> checkAll() {
        Map<String, Object> overallStatus = new HashMap<>();
        overallStatus.put("timestamp", LocalDateTime.now());

        overallStatus.put("backend", buildHealthResponse("UP", "Backend is running."));

        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                overallStatus.put("database", buildHealthResponse("UP", "Database is healthy."));
            } else {
                overallStatus.put("database", buildHealthResponse("DOWN", "Database health check failed."));
            }
        } catch (Exception e) {
            overallStatus.put("database", buildHealthResponse("DOWN", "Database is not reachable: " + e.getMessage()));
        }

        try {
            var url = new java.net.URL(frontendUrl);
            var connection = (java.net.HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(2000);
            connection.setReadTimeout(2000);
            if (connection.getResponseCode() == 200) {
                overallStatus.put("frontend", buildHealthResponse("UP", "Frontend is reachable."));
            } else {
                overallStatus.put("frontend", buildHealthResponse("DOWN", "Frontend is not reachable: HTTP " + connection.getResponseCode()));
            }
        } catch (Exception e) {
            overallStatus.put("frontend", buildHealthResponse("DOWN", "Frontend health check failed: " + e.getMessage()));
        }

        return ResponseEntity.ok(overallStatus);
    }
}
