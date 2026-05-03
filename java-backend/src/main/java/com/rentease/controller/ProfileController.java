package com.rentease.controller;

import com.rentease.model.UserProfile;
import com.rentease.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserProfileRepository repository;

    @GetMapping
    public UserProfile getProfile(@RequestHeader(value = "X-User-Id", required = false) String userId) {
        if (userId == null) return null;
        return repository.findById(userId).orElse(null);
    }

    @PostMapping
    public UserProfile upsertProfile(@RequestBody UserProfile profile, 
                                     @RequestHeader(value = "X-User-Id", required = false) String userId) {
        if (userId != null) {
            UserProfile existing = repository.findById(userId).orElse(new UserProfile());
            existing.setId(userId);
            existing.setName(profile.getName());
            existing.setEmail(profile.getEmail() != null ? profile.getEmail() : existing.getEmail());
            existing.setAddress(profile.getAddress());
            existing.setPhone(profile.getPhone());
            // Intentionally do NOT update password here
            return repository.save(existing);
        }
        return null;
    }
}
