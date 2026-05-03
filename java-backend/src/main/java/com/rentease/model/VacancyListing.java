package com.rentease.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "listings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VacancyListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownerId;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String name;

    @Column(length = 1000)
    private String description;

    private String location;

    private Double latitude;
    private Double longitude;

    private String contactPhone;

    private long createdAt;

    @Column(columnDefinition = "TEXT")
    private String metadata;

    @ElementCollection
    @CollectionTable(name = "listing_images", joinColumns = @JoinColumn(name = "listing_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    private List<String> imageKeys;
}
