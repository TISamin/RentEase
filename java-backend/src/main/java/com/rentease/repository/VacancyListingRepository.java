package com.rentease.repository;

import com.rentease.model.Category;
import com.rentease.model.VacancyListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface VacancyListingRepository extends JpaRepository<VacancyListing, Long> {
    
    List<String> findByOwnerId(String ownerId); // Note: Simplified for now
    
    @Query("SELECT v FROM VacancyListing v WHERE " +
           "(:category IS NULL OR v.category = :category) AND " +
           "(:location IS NULL OR LOWER(v.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<VacancyListing> searchListings(@Param("category") Category category, 
                                        @Param("location") String location);

    List<VacancyListing> findAllByOwnerId(String ownerId);
}
