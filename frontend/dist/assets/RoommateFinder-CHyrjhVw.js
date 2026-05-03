import { r as reactExports, j as jsxRuntimeExports, S as Search, I as Input, B as Button } from "./index-CYfAcN1s.js";
import { L as ListingCardSkeleton, B as Building2, a as ListingCard } from "./ListingCard-BJ7rVy4H.js";
import { u as useBrowseListings, C as Category } from "./useBackend-DhQTVAua.js";
function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
function RoommateFinder() {
  const [locationInput, setLocationInput] = reactExports.useState("");
  const debouncedLocation = useDebounce(locationInput, 350);
  const filter = {
    locationQuery: debouncedLocation.trim() || void 0,
    category: Category.roommate_finder
  };
  const { data: listings, isLoading, isError } = useBrowseListings(filter);
  const hasActiveFilters = locationInput.trim() !== "";
  const handleClearFilters = reactExports.useCallback(() => {
    setLocationInput("");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", "data-ocid": "browse.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-8 sm:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight", children: "Roommate Finder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm sm:text-base mt-1", children: "Find people looking for roommates or rooms in your area." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "browse.location.search_input",
            type: "search",
            placeholder: "Search by city, area, or location…",
            value: locationInput,
            onChange: (e) => setLocationInput(e.target.value),
            className: "pl-9 bg-background border-input focus-visible:ring-accent",
            "aria-label": "Search by location"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 min-h-6 gap-2", children: [
        !isLoading && !isError && listings !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", "aria-live": "polite", children: listings.length === 0 ? "No results" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: listings.length }),
          " ",
          listings.length === 1 ? "listing" : "listings",
          " found"
        ] }) }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: handleClearFilters,
            "data-ocid": "browse.clear_filters.button",
            className: "ml-auto text-accent hover:text-accent/80 hover:bg-accent/10 px-2 h-7 text-xs",
            children: "Clear filters"
          }
        )
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "browse.loading_state",
          "aria-busy": "true",
          "aria-label": "Loading listings",
          children: Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no stable key
            /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCardSkeleton, {}, i)
          ))
        }
      ),
      isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 gap-3 text-center",
          "data-ocid": "browse.error_state",
          role: "alert",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-destructive/10 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Building2,
              {
                className: "h-10 w-10 text-destructive/60",
                "aria-hidden": "true"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Something went wrong loading listings. Please try again." })
          ]
        }
      ),
      !isLoading && !isError && (listings == null ? void 0 : listings.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
          "data-ocid": "browse.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Building2,
              {
                className: "h-10 w-10 text-muted-foreground/60",
                "aria-hidden": "true"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "No listings found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: hasActiveFilters ? "Try adjusting your location search or changing the category filter." : "No listings are available right now. Check back soon." })
            ] }),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleClearFilters,
                "data-ocid": "browse.empty_state.clear_button",
                children: "Clear all filters"
              }
            )
          ]
        }
      ),
      !isLoading && !isError && listings && listings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "browse.list",
          children: listings.map((listing, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListingCard,
            {
              listing,
              index
            },
            listing.id.toString()
          ))
        }
      )
    ] })
  ] });
}
export {
  RoommateFinder as default
};
