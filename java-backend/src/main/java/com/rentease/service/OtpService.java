package com.rentease.service;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class OtpService {

    // Simple in-memory storage for OTPs. 
    // Key: email, Value: OTP string
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();
    private final SecureRandom random = new SecureRandom();

    public String generateAndStoreOtp(String email) {
        // Generate a 6-digit random number
        int number = 100000 + random.nextInt(900000);
        String otp = String.valueOf(number);
        
        // Store it (it will overwrite any existing OTP for this email)
        otpStorage.put(email, otp);
        
        return otp;
    }

    public boolean verifyOtp(String email, String inputOtp) {
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(inputOtp)) {
            // Remove the OTP after successful verification so it can't be reused
            otpStorage.remove(email);
            return true;
        }
        return false;
    }
}
