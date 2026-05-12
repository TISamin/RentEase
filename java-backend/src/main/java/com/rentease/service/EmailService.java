package com.rentease.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        System.out.println("Attempting to send OTP email to: " + toEmail);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your RentEase Verification Code");
        message.setText("Welcome to RentEase!\n\nYour 6-digit verification code is: " + otp
                + "\n\nThis code will expire shortly. Do not share it with anyone.");

        mailSender.send(message);
    }
}
