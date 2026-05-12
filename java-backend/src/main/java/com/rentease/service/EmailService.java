package com.rentease.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendOtpEmail(String toEmail, String otp) {
        System.out.println("=== EMAIL DEBUG START ===");
        System.out.println("From: " + fromEmail);
        System.out.println("To: " + toEmail);
        System.out.println("OTP: " + otp);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Your RentEase Verification Code");
            message.setText("Welcome to RentEase!\n\nYour 6-digit verification code is: " + otp
                    + "\n\nThis code will expire shortly. Do not share it with anyone.");

            mailSender.send(message);
            System.out.println("=== EMAIL SENT SUCCESSFULLY ===");
        } catch (Exception e) {
            System.out.println("=== EMAIL FAILED ===");
            System.out.println("Error class: " + e.getClass().getName());
            System.out.println("Error message: " + e.getMessage());
            if (e.getCause() != null) {
                System.out.println("Root cause: " + e.getCause().getClass().getName());
                System.out.println("Root message: " + e.getCause().getMessage());
            }
            e.printStackTrace();
            throw e; // re-throw so the controller returns the error
        }
    }
}
