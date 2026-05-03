import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { CATEGORY_LABELS } from "../types";
function getCategoryVariantClass(category) {
    const map = {
        flat: "bg-accent/15 text-accent border-accent/30",
        hotel: "bg-primary/15 text-primary border-primary/30",
        house: "bg-secondary text-secondary-foreground border-border",
        convention_hall: "bg-muted text-muted-foreground border-border",
        shifting_service: "bg-primary/10 text-primary border-primary/20",
    };
    return map[category] ?? "bg-muted text-muted-foreground border-border";
}
function getImageUrl(imageKeys) {
    if (!imageKeys || imageKeys.length === 0)
        return null;
    const key = imageKeys[0];
    if (key && key.length > 0)
        return key;
    return null;
}
export function ListingCard({ listing, index = 0 }) {
    const imageUrl = getImageUrl(listing.imageKeys);
    const categoryLabel = CATEGORY_LABELS[listing.category] ?? listing.category;
    const categoryClass = getCategoryVariantClass(listing.category);
    return (<Link to="/listings/$id" params={{ id: listing.id.toString() }} data-ocid={`listing.item.${index + 1}`} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
      <Card className="overflow-hidden border border-border shadow-xs hover:shadow-md transition-smooth group-hover:-translate-y-0.5 h-full">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {imageUrl ? (<img src={imageUrl} alt={listing.name} className="h-full w-full object-cover transition-smooth group-hover:scale-105"/>) : (<div className="flex h-full w-full items-center justify-center bg-muted">
              <img src="/assets/generated/listing-placeholder.jpg" alt="Property placeholder" className="h-full w-full object-cover opacity-60" onError={(e) => {
                e.currentTarget.style.display = "none";
            }}/>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <svg className="h-10 w-10 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 10.5h18"/>
                </svg>
                <span className="text-xs text-muted-foreground/50">
                  No image
                </span>
              </div>
            </div>)}
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${categoryClass}`}>
              {categoryLabel}
            </span>
          </div>
        </div>

        <CardContent className="p-4 flex flex-col gap-2">
          <h3 className="font-display font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {listing.name}
          </h3>

          <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-0">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true"/>
            <span className="truncate">{listing.location}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto pt-1 border-t border-border">
            <Phone className="h-3 w-3 shrink-0" aria-hidden="true"/>
            <span className="truncate font-mono">{listing.contactPhone}</span>
          </div>
        </CardContent>
      </Card>
    </Link>);
}
export function ListingCardSkeleton() {
    return (<Card className="overflow-hidden border border-border">
      <div className="aspect-[4/3] bg-muted animate-pulse"/>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="h-5 w-3/4 rounded bg-muted animate-pulse"/>
        <div className="h-3 w-1/2 rounded bg-muted animate-pulse"/>
        <div className="h-3 w-full rounded bg-muted animate-pulse"/>
        <div className="h-3 w-5/6 rounded bg-muted animate-pulse"/>
        <div className="h-3 w-1/3 rounded bg-muted animate-pulse mt-1"/>
      </CardContent>
    </Card>);
}
