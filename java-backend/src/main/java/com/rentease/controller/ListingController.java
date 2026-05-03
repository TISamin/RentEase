package com.rentease.controller;

import com.rentease.model.Category;
import com.rentease.model.VacancyListing;
import com.rentease.repository.VacancyListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    @Autowired
    private VacancyListingRepository repository;

    @GetMapping
    public List<VacancyListing> getListings(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String searchQuery) {
            
        Category catEnum = null;
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
            try {
                catEnum = Category.valueOf(category.toLowerCase());
            } catch (IllegalArgumentException e) {
                // Invalid category string, keep catEnum as null to fetch all
            }
        }
        List<VacancyListing> allListings = repository.findAll();
        
        Category finalCatEnum = catEnum;
        return allListings.stream()
            .filter(v -> finalCatEnum == null || finalCatEnum.equals(v.getCategory()))
            .filter(v -> location == null || location.trim().isEmpty() || 
                    (v.getLocation() != null && v.getLocation().toLowerCase().contains(location.toLowerCase())))
            .filter(v -> searchQuery == null || searchQuery.trim().isEmpty() ||
                    (v.getName() != null && v.getName().toLowerCase().contains(searchQuery.toLowerCase())) ||
                    (v.getDescription() != null && v.getDescription().toLowerCase().contains(searchQuery.toLowerCase())))
            .collect(java.util.stream.Collectors.toList());
    }

    @GetMapping("/{id}")
    public VacancyListing getListing(@PathVariable @NonNull Long id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/my")
    public List<VacancyListing> getMyListings(@RequestHeader(value = "X-User-Id", required = false) String userId) {
        if (userId == null) return List.of();
        return repository.findAllByOwnerId(userId);
    }

    @PostMapping
    public VacancyListing createListing(@RequestBody VacancyListing listing, 
                                        @RequestHeader(value = "X-User-Id", required = false) String userId) {
        if (userId == null) {
            userId = "unknown-user";
        }
        listing.setOwnerId(userId);
        listing.setCreatedAt(System.currentTimeMillis());
        return repository.save(listing);
    }

    @PutMapping("/{id}")
    public VacancyListing updateListing(@PathVariable @NonNull Long id, @RequestBody VacancyListing input) {
        return repository.findById(id).map(listing -> {
            listing.setName(input.getName());
            listing.setDescription(input.getDescription());
            listing.setLocation(input.getLocation());
            listing.setLatitude(input.getLatitude());
            listing.setLongitude(input.getLongitude());
            listing.setContactPhone(input.getContactPhone());
            listing.setImageKeys(input.getImageKeys());
            listing.setMetadata(input.getMetadata());
            return repository.save(listing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public org.springframework.http.ResponseEntity<?> deleteListing(@PathVariable @NonNull Long id) {
        repository.deleteById(id);
        return org.springframework.http.ResponseEntity.ok(java.util.Map.of("success", true));
    }
}
