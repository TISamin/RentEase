package com.rentease.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    private String id; // This will match the userId from the frontend

    private String name;
    private String email;
    private String address;
    private String phone;
    
    // New field for password
    private String password;
}
