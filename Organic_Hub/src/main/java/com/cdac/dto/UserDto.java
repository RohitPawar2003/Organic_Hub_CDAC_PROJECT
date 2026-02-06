package com.cdac.dto;

import com.cdac.modelmvc.Role;

public class UserDto {

   // private Long useId;
    private String name;
    private String email;
    private String password; // <- add this
    private Role role;

   

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {       // <- add getter
        return password;
    }

    public void setPassword(String password) { // <- add setter
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
