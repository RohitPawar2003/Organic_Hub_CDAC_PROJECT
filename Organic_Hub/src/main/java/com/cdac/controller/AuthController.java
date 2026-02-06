package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.LoginRequestDTO;
import com.cdac.dto.LoginResponseDTO;
import com.cdac.dto.UserDto;
import com.cdac.modelmvc.Role;
import com.cdac.modelmvc.User;
import com.cdac.repository.UserRepository;
import com.cdac.security.JwtTokenProvider;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
@Validated
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ------------------- REGISTER -------------------
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User newUser = new User();
        newUser.setName(userDTO.getName());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newUser.setRole(userDTO.getRole() != null ? userDTO.getRole() : Role.ADMIN); // default USER

        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    // ------------------- LOGIN -------------------
    @PostMapping("/signin")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
        System.out.println(request.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()

                ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(request.getEmail());
        String token = jwtTokenProvider.generateToken(user);

        return new LoginResponseDTO(
                token,
                user.getEmail(),
                user.getRole().name());
    }

    // ------------------- GET CURRENT USER -------------------
    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDto dto = new UserDto();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());

        return ResponseEntity.ok(dto);
    }
}
