import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ListingCard, ListingCardSkeleton } from "../components/ListingCard";
import { useBrowseListings } from "../hooks/useBackend";
import type { BrowseFilter } from "../types";
import { BROWSE_CATEGORIES, CATEGORY_LABELS } from "../types";
import type { Category } from "../types";

function useDebounce<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Browse() {
  const [locationInput, setLocationInput] = useState("");
  const [categoryValue, setCategoryValue] = useState<string>("all");

  const debouncedLocation = useDebounce(locationInput, 350);

  const filter: BrowseFilter = {
    locationQuery: debouncedLocation.trim() || undefined,
    category: categoryValue !== "all" ? (categoryValue as Category) : undefined,
  };

  const { data: rawListings, isLoading, isError } = useBrowseListings(filter);

  // Only show rental-type listings (house, flat, hotel, convention_hall).
  // Services, marketplace, and roommate listings have their own dedicated pages.
  const listings = useMemo(() => {
    if (!rawListings) return rawListings;
    const rentalSet = new Set<string>(BROWSE_CATEGORIES);
    return rawListings.filter((l) => rentalSet.has(l.category));
  }, [rawListings]);

  const hasActiveFilters =
    locationInput.trim() !== "" || categoryValue !== "all";

  const handleClearFilters = useCallback(() => {
    setLocationInput("");
    setCategoryValue("all");
  }, []);

  return (
    <main className="min-h-screen bg-background" data-ocid="browse.page">
      {/* Header / filter band */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="mb-5">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              Browse Rentals
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Find flats, hotels, houses, and convention halls near you.
            </p>
          </div>

          {/* Controls row */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl">
            {/* Location search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
                aria-hidden="true"
              />
              <Input
                data-ocid="browse.location.search_input"
                type="search"
                placeholder="Search by city, area, or location…"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="pl-9 bg-background border-input focus-visible:ring-accent"
                aria-label="Search by location"
              />
            </div>

            {/* Category select */}
            <div className="sm:w-52 shrink-0">
              <Select value={categoryValue} onValueChange={setCategoryValue}>
                <SelectTrigger
                  data-ocid="browse.category.select"
                  className="bg-background border-input w-full"
                  aria-label="Filter by category"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <SlidersHorizontal
                      className="h-3.5 w-3.5 text-muted-foreground shrink-0"
                      aria-hidden="true"
                    />
                    <SelectValue placeholder="All categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" data-ocid="browse.filter.all">
                    All categories
                  </SelectItem>
                  {BROWSE_CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      data-ocid={`browse.filter.${cat}`}
                    >
                      {CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results area */}
      <section className="container mx-auto px-4 sm:px-6 py-8">
        {/* Meta row: count + clear */}
        <div className="flex items-center justify-between mb-6 min-h-6 gap-2">
          {!isLoading && !isError && listings !== undefined && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {listings.length === 0 ? (
                "No results"
              ) : (
                <>
                  <span className="font-semibold text-foreground">
                    {listings.length}
                  </span>{" "}
                  {listings.length === 1 ? "listing" : "listings"} found
                </>
              )}
            </p>
          )}

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              data-ocid="browse.clear_filters.button"
              className="ml-auto text-accent hover:text-accent/80 hover:bg-accent/10 px-2 h-7 text-xs"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="browse.loading_state"
            aria-busy="true"
            aria-label="Loading listings"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no stable key
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div
            className="flex flex-col items-center justify-center py-20 gap-3 text-center"
            data-ocid="browse.error_state"
            role="alert"
          >
            <div className="rounded-full bg-destructive/10 p-5">
              <Building2
                className="h-10 w-10 text-destructive/60"
                aria-hidden="true"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Something went wrong loading listings. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && listings?.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            data-ocid="browse.empty_state"
          >
            <div className="rounded-full bg-muted p-5">
              <Building2
                className="h-10 w-10 text-muted-foreground/60"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-display font-semibold text-foreground text-lg">
                No listings found
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs">
                {hasActiveFilters
                  ? "Try adjusting your location search or changing the category filter."
                  : "No listings are available right now. Check back soon."}
              </p>
            </div>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                data-ocid="browse.empty_state.clear_button"
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}

        {/* Listings grid */}
        {!isLoading && !isError && listings && listings.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="browse.list"
          >
            {listings.map((listing, index) => (
              <ListingCard
                key={listing.id.toString()}
                listing={listing}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
