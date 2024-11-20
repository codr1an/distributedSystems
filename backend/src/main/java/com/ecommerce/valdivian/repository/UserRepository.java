package com.ecommerce.valdivian.repository;

import com.ecommerce.valdivian.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends  JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findAll(Sort sort);
    List<User> findByEmail(String email, Sort sort);
    List<User> findByName(String name, Sort sort);
    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findByRole(@Param("role") String role);
}
