import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import type { ListingPublic } from "../types";
import { CATEGORY_LABELS } from "../types";

interface ListingCardProps {
  listing: ListingPublic;
  index?: number;
}

function getCategoryVariantClass(category: string): string {
  const map: Record<string, string> = {
    flat: "bg-accent/15 text-accent border-accent/30",
    hotel: "bg-primary/15 text-primary border-primary/30",
    house: "bg-secondary text-secondary-foreground border-border",
    convention_hall: "bg-muted text-muted-foreground border-border",
    shifting_service: "bg-primary/10 text-primary border-primary/20",
  };
  return map[category] ?? "bg-muted text-muted-foreground border-border";
}

function getImageUrl(imageKeys: string[]): string | null {
  if (!imageKeys || imageKeys.length === 0) return null;
  const key = imageKeys[0];
  if (key && key.length > 0) return key;
  return null;
}

export function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const imageUrl = getImageUrl(listing.imageKeys);
  const categoryLabel = CATEGORY_LABELS[listing.category] ?? listing.category;
  const categoryClass = getCategoryVariantClass(listing.category);

  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id.toString() }}
      data-ocid={`listing.item.${index + 1}`}
      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Card className="overflow-hidden border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full rounded-xl bg-card/80 backdrop-blur-sm">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={listing.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/60">
              <img
                src="/assets/generated/listing-placeholder.jpg"
                alt="Property placeholder"
                className="h-full w-full object-cover opacity-50"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <svg
                  className="h-10 w-10 text-muted-foreground/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 10.5h18"
                  />
                </svg>
                <span className="text-xs text-muted-foreground/40">
                  No image
                </span>
              </div>
            </div>
          )}
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border backdrop-blur-sm ${categoryClass}`}
            >
              {categoryLabel}
            </span>
          </div>
          {/* Image count indicator */}
          {listing.imageKeys.length > 1 && (
            <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium">
              +{listing.imageKeys.length - 1}
            </div>
          )}
        </div>

        <CardContent className="p-4 flex flex-col gap-2.5">
          <h3 className="font-display font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {listing.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
            <MapPin className="h-3 w-3 shrink-0 text-accent/70" aria-hidden="true" />
            <span className="truncate">{listing.location}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">
            <Phone className="h-3 w-3 shrink-0 text-primary/60" aria-hidden="true" />
            <span className="truncate font-mono">{listing.contactPhone}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function ListingCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <CardContent className="p-4 flex flex-col gap-2.5">
        <div className="h-5 w-3/4 rounded-md bg-muted animate-pulse" />
        <div className="h-3 w-1/2 rounded-md bg-muted animate-pulse" />
        <div className="h-3 w-full rounded-md bg-muted animate-pulse" />
        <div className="h-3 w-5/6 rounded-md bg-muted animate-pulse" />
        <div className="h-3 w-1/3 rounded-md bg-muted animate-pulse mt-1" />
      </CardContent>
    </Card>
  );
}
