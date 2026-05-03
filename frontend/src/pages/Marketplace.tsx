import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ListingCard, ListingCardSkeleton } from "../components/ListingCard";
import { useBrowseListings } from "../hooks/useBackend";
import type { BrowseFilter } from "../types";
import { BROWSE_CATEGORIES, CATEGORY_LABELS } from "../types";
import { Category } from "../types";

function useDebounce<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Marketplace() {
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 350);

  const filter: BrowseFilter = {
    searchQuery: debouncedSearch.trim() || undefined,
    category: Category.marketplace,
  };

  const { data: listings, isLoading, isError } = useBrowseListings(filter);

  const hasActiveFilters = searchInput.trim() !== "";

  const handleClearFilters = useCallback(() => {
    setSearchInput("");
  }, []);

  return (
    <main className="min-h-screen bg-background" data-ocid="marketplace.page">
      {/* Header / filter band */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Marketplace
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1">
                Find used furniture, appliances, and items for your home.
              </p>
            </div>
            <Link to="/post-listing">
              <Button>Sell Item</Button>
            </Link>
          </div>

          {/* Controls row */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
                aria-hidden="true"
              />
              <Input
                data-ocid="marketplace.search_input"
                type="search"
                placeholder="Search items by name or description…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 bg-background border-input focus-visible:ring-accent"
                aria-label="Search marketplace items"
              />
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
