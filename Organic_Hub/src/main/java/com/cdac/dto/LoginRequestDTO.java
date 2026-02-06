package com.cdac.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
//import jakarta.validation.constraints.NotBlank;

@AllArgsConstructor
@RequiredArgsConstructor
public class LoginRequestDTO {

    //@NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    //@NotBlank(message = "Password is required")
    private String password;

    // getters & setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
