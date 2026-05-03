package com.rentease.repository;

import com.rentease.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile, String> {
    List<UserProfile> findByEmail(String email);
}
