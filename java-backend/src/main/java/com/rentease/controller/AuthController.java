package com.rentease.controller;

import com.rentease.service.EmailService;
import com.rentease.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;
import java.util.UUID;
import java.security.MessageDigest;

import com.rentease.model.UserProfile;
import com.rentease.repository.UserProfileRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserProfileRepository userProfileRepository;

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to hash password", e);
        }
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email") != null ? request.get("email").trim().toLowerCase() : null;
        if (email == null || !email.contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid email address"));
        }

        try {
            // 1. Generate OTP
            String otp = otpService.generateAndStoreOtp(email);
            
            // 2. Send Email
            emailService.sendOtpEmail(email, otp);
            
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully to " + email));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to send email. Check your SMTP configuration."));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email") != null ? request.get("email").trim().toLowerCase() : null;
        String otp = request.get("otp");

        if (email == null || otp == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and OTP are required"));
        }

        boolean isValid = otpService.verifyOtp(email, otp);

        if (isValid) {
            return ResponseEntity.ok(Map.of("message", "Verification successful"));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired OTP"));
        }
    }

    @PostMapping("/set-password")
    public ResponseEntity<?> setPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email") != null ? request.get("email").trim().toLowerCase() : null;
        String password = request.get("password");

        if (email == null || password == null || password.length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and valid password (min 6 chars) are required"));
        }

        // Complete signup by saving the user
        List<UserProfile> users = userProfileRepository.findByEmail(email);
        UserProfile user = users.isEmpty() ? new UserProfile() : users.get(0);
        
        if (user.getId() == null) {
            user.setId("user-" + UUID.randomUUID().toString());
        }
        user.setEmail(email);
        user.setPassword(hashPassword(password));
        userProfileRepository.save(user);

        String mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-" + UUID.randomUUID().toString();
        return ResponseEntity.ok(Map.of(
            "message", "Signup complete",
            "token", mockToken,
            "userId", user.getId()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email") != null ? request.get("email").trim().toLowerCase() : null;
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }

        List<UserProfile> users = userProfileRepository.findByEmail(email);
        if (!users.isEmpty()) {
            UserProfile user = users.get(0);
            if (user.getPassword() != null && user.getPassword().equals(hashPassword(password))) {
                String mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-" + UUID.randomUUID().toString();
                return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", mockToken,
                    "userId", user.getId()
                ));
            }
        }
        
        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }
}
