import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Phone, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useDeleteListing, useGetListing } from "../hooks/useBackend";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "../types";

// --- Sub-component: renders a single image from its URL/key ---
function GalleryImage({
  imageKey,
  alt,
  className,
  onClick,
  isActive,
}: {
  imageKey: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: image thumbnail click handled via keyboard elsewhere
    <img
      src={imageKey}
      alt={alt}
      className={`${className ?? ""} object-cover transition-smooth cursor-pointer ${
        isActive ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
      onClick={onClick}
    />
  );
}

// --- Sub-component: Loading skeleton ---
function ListingDetailSkeleton() {
  return (
    <div
      className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl"
      data-ocid="listing_detail.loading_state"
    >
      <Skeleton className="h-8 w-32 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-4">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-5 w-40 mt-2" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// --- Main page ---
export default function ListingDetail() {
  const { id } = useParams({ from: "/listings/$id" });
  const listingId = id;
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { data: listing, isLoading, error } = useGetListing(listingId);
  const deleteListing = useDeleteListing();

  const [activeIndex, setActiveIndex] = useState(0);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteListing.mutateAsync(listingId);
      toast.success("Listing deleted successfully");
      navigate({ to: "/browse" });
    } catch {
      toast.error("Failed to delete listing. Please try again.");
    }
    setDeleteOpen(false);
  };

  if (isLoading) return <ListingDetailSkeleton />;

  if (error || !listing) {
    return (
      <div
        className="container mx-auto px-4 sm:px-6 py-20 flex flex-col items-center gap-4 text-center"
        data-ocid="listing_detail.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
          <MapPin className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Listing not found
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs">
          This listing may have been removed or doesn't exist.
        </p>
        <Link to="/browse" data-ocid="listing_detail.back.link">
          <Button variant="outline" className="gap-2 mt-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Button>
        </Link>
      </div>
    );
  }

  const categoryLabel =
    CATEGORY_LABELS[listing.category] ?? String(listing.category);
  const categoryColor =
    CATEGORY_COLORS[listing.category] ?? "bg-muted text-muted-foreground";
  const datePosted = new Date(
    Number(listing.createdAt) / 1_000_000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isOwner =
    userId != null && listing.owner === userId;

  const imageKeys = listing.imageKeys;
  const hasImages = imageKeys.length > 0;
  const safeIndex = Math.min(activeIndex, Math.max(0, imageKeys.length - 1));

  let parsedMetadata: any = null;
  if (listing.metadata) {
    try {
      parsedMetadata = JSON.parse(listing.metadata);
    } catch {
      // ignore
    }
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="listing_detail.page">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
        {/* Back + owner actions row */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <Link to="/browse" data-ocid="listing_detail.back.link">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-2 -ml-2 text-accent hover:text-accent hover:bg-accent/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Browse
            </Button>
          </Link>

          {isOwner && (
            <div
              className="flex items-center gap-2"
              data-ocid="listing_detail.owner_actions.panel"
            >
              <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    data-ocid="listing_detail.delete.open_modal_button"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="listing_detail.delete.dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove{" "}
                      <strong>{listing.name}</strong> and cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="listing_detail.delete.cancel_button">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={deleteListing.isPending}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      data-ocid="listing_detail.delete.confirm_button"
                    >
                      {deleteListing.isPending ? "Deleting…" : "Yes, delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: gallery + description */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Main image */}
            <div
              className="aspect-video overflow-hidden rounded-xl bg-muted border border-border shadow-sm"
              data-ocid="listing_detail.gallery.panel"
            >
              {hasImages ? (
                <GalleryImage
                  imageKey={imageKeys[safeIndex]}
                  alt={`${listing.name} — image ${safeIndex + 1}`}
                  className="h-full w-full"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center gap-2">
                  <MapPin className="h-10 w-10 text-muted-foreground/40" />
                  <p className="text-muted-foreground text-sm">
                    No images available
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {imageKeys.length > 1 && (
              <div
                className="grid grid-cols-4 sm:grid-cols-5 gap-2"
                data-ocid="listing_detail.thumbnails.list"
              >
                {imageKeys.map((key, i) => (
                  <button
                    key={key}
                    type="button"
                    aria-label={`View image ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      i === safeIndex
                        ? "border-primary shadow-sm"
                        : "border-border hover:border-primary/50"
                    }`}
                    data-ocid={`listing_detail.thumbnail.${i + 1}`}
                  >
                    <GalleryImage
                      imageKey={key}
                      alt={`${listing.name} thumbnail ${i + 1}`}
                      isActive={i === safeIndex}
                      className="h-full w-full"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="font-display font-semibold text-foreground text-lg mb-3">
                About this listing
              </h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Current Roommates */}
            {parsedMetadata?.currentRoommates && parsedMetadata.currentRoommates.length > 0 && (
              <div className="pt-6 border-t border-border mt-2">
                <h2 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  Meet the Current Roommates
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {parsedMetadata.currentRoommates.map((rm: any, idx: number) => (
                    <Card key={idx} className="overflow-hidden border border-border shadow-sm">
                      <div className="flex flex-row items-center p-4 gap-4 bg-muted/20">
                        {rm.photoData ? (
                          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-background shadow-sm shrink-0">
                            <img src={rm.photoData} alt={rm.name} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border-2 border-background shadow-sm shrink-0">
                            <Users className="h-8 w-8 text-muted-foreground/50" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{rm.name}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4 pt-3 border-t border-border/50">
                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                          {rm.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: info card */}
          <div className="flex flex-col gap-4">
            <Card
              className="border border-border shadow-sm sticky top-6"
              data-ocid="listing_detail.info.card"
            >
              <CardContent className="p-5 flex flex-col gap-5">
                {/* Category badge */}
                <Badge
                  className={`self-start text-xs font-semibold ${categoryColor}`}
                >
                  {categoryLabel}
                </Badge>

                {/* Name */}
                <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
                  {listing.name}
                </h1>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                  <span className="break-words">{listing.location}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Posted {datePosted}</span>
                </div>

                {parsedMetadata && parsedMetadata.roommatesNeeded != null && (
                  <div className="border-t border-border pt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Needed</span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users className="h-4 w-4 text-accent" />
                        {parsedMetadata.roommatesNeeded}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Current</span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users className="h-4 w-4 text-accent" />
                        {parsedMetadata.roommatesGot}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                    Contact
                  </p>
                  <a
                    href={`tel:${listing.contactPhone}`}
                    className="flex items-center gap-2 text-primary font-semibold hover:underline transition-colors duration-200 text-sm"
                    data-ocid="listing_detail.contact_phone.link"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {listing.contactPhone}
                  </a>
                </div>

                {/* Call CTA */}
                <a href={`tel:${listing.contactPhone}`} className="block">
                  <Button
                    type="button"
                    className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
                    data-ocid="listing_detail.call.primary_button"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
