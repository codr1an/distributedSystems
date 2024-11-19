package com.ecommerce.valdivian.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginBody {
    private String email;
    private String password;
}
