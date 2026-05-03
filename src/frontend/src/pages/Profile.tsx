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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Building2, Pencil, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ListingCard, ListingCardSkeleton } from "../components/ListingCard";
import { useAuth } from "../hooks/useAuth";
import {
  useDeleteListing,
  useMyListings,
  useMyProfile,
  useUpsertProfile,
} from "../hooks/useBackend";

// ─── Profile form ─────────────────────────────────────────────────────────────

function ProfileForm() {
  const { data: profile, isLoading } = useMyProfile();
  const { mutateAsync: upsert, isPending, isError } = useUpsertProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setAddress(profile.address);
      setPhone(profile.phone);
    }
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await upsert({ name, email, address, phone });
      toast.success("Profile saved successfully.");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  }

  if (isLoading) {
    return (
      <Card data-ocid="profile.form_loading_state">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-5">
          {[...Array(4)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-ocid="profile.form_card">
      <CardHeader>
        <CardTitle className="font-display text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-primary" aria-hidden="true" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input
                id="profile-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                data-ocid="profile.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-phone">Phone Number</Label>
              <Input
                id="profile-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1XXX-XXXXXX"
                autoComplete="tel"
                data-ocid="profile.phone_input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email Address</Label>
            <Input
              id="profile-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              data-ocid="profile.email_input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-address">Address</Label>
            <Input
              id="profile-address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, city, district"
              autoComplete="street-address"
              data-ocid="profile.address_input"
            />
          </div>

          {isError && (
            <p
              className="text-sm text-destructive"
              role="alert"
              data-ocid="profile.form_error_state"
            >
              Something went wrong. Please try again.
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            data-ocid="profile.save_button"
            className="w-full sm:w-auto"
          >
            {isPending ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── My Listings section ──────────────────────────────────────────────────────

function MyListingsSection() {
  const { data: listings, isLoading } = useMyListings();
  const { mutateAsync: deleteListing } = useDeleteListing();

  async function handleDelete(id: string | number) {
    try {
      await deleteListing(id);
      toast.success("Listing deleted.");
    } catch {
      toast.error("Failed to delete listing.");
    }
  }

  return (
    <section
      aria-labelledby="my-listings-heading"
      data-ocid="profile.listings_section"
    >
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2
          id="my-listings-heading"
          className="font-display text-xl font-semibold text-foreground"
        >
          My Listings
        </h2>
        <Button asChild size="sm" data-ocid="profile.post_listing_button">
          <Link to="/post-listing">
            <Building2 className="h-4 w-4 mr-2" aria-hidden="true" />
            Post New
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          data-ocid="profile.listings_loading_state"
        >
          {[...Array(3)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      ) : !listings || listings.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/20 py-14"
          data-ocid="profile.listings_empty_state"
        >
          <div className="rounded-full bg-muted p-4">
            <Building2
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div className="space-y-1 text-center">
            <p className="font-display font-semibold text-foreground">
              No listings yet
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Post your first property or service and reach thousands of
              potential renters.
            </p>
          </div>
          <Button asChild data-ocid="profile.listings_empty_add_button">
            <Link to="/post-listing">Post a Listing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, idx) => (
            <div
              key={listing.id.toString()}
              className="relative group/card"
              data-ocid={`profile.listing.item.${idx + 1}`}
            >
              <ListingCard listing={listing} index={idx} />

              {/* Action buttons overlay */}
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-smooth pointer-events-none group-hover/card:pointer-events-auto">
                {/* Edit */}
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  asChild
                  className="h-8 w-8 shadow-md"
                  aria-label={`Edit listing ${listing.name}`}
                  data-ocid={`profile.listing.edit_button.${idx + 1}`}
                >
                  <Link
                    to="/post-listing"
                    search={{ edit: listing.id.toString() }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                </Button>

                {/* Delete with confirmation */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8 shadow-md"
                      aria-label={`Delete listing ${listing.name}`}
                      data-ocid={`profile.listing.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    data-ocid={`profile.delete_listing.dialog.${idx + 1}`}
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove &ldquo;{listing.name}
                        &rdquo;. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        data-ocid={`profile.delete_listing.cancel_button.${idx + 1}`}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(listing.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        data-ocid={`profile.delete_listing.confirm_button.${idx + 1}`}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-ocid="profile.loading_state"
      >
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center px-4"
        data-ocid="profile.unauthenticated_state"
      >
        <Card className="w-full max-w-sm text-center shadow-md">
          <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4">
            <div className="rounded-full bg-primary/10 p-5">
              <User className="h-10 w-10 text-primary" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Sign in required
              </h2>
              <p className="text-sm text-muted-foreground">
                Please log in to view and edit your profile.
              </p>
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={login}
              data-ocid="profile.login_button"
            >
              Sign In with Email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-10"
      data-ocid="profile.page"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary/10 p-3 shrink-0">
          <User className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
            My Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal details and listings
          </p>
        </div>
      </div>

      {/* Profile form */}
      <ProfileForm />

      {/* Divider */}
      <hr className="border-border" />

      {/* My listings */}
      <MyListingsSection />
    </div>
  );
}
