import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Home as HomeIcon,
  Hotel,
  ListPlus,
  MapPin,
  Search,
  Star,
  Truck,
  User,
  ShoppingBag,
  Briefcase,
  Users,
} from "lucide-react";
import { ListingCard, ListingCardSkeleton } from "../components/ListingCard";
import { useAuth } from "../hooks/useAuth";
import { useBrowseListings, useMyProfile } from "../hooks/useBackend";
import { CATEGORY_LABELS, Category } from "../types";

const BROWSE_CATEGORIES = [
  {
    category: Category.flat,
    icon: HomeIcon,
    description: "Affordable city flats",
    bgClass:
      "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
  },
  {
    category: Category.hotel,
    icon: Hotel,
    description: "Short-stay hotels",
    bgClass:
      "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  },
  {
    category: Category.house,
    icon: Building2,
    description: "Spacious family homes",
    bgClass:
      "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
  },
  {
    category: Category.convention_hall,
    icon: Star,
    description: "Event & meeting spaces",
    bgClass:
      "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  },
];

const QUICK_LINKS = [
  {
    to: "/marketplace",
    label: "Marketplace",
    icon: ShoppingBag,
    description: "Buy & sell items",
    gradient: "from-orange-500/10 to-amber-500/10",
    iconColor: "text-orange-600",
  },
  {
    to: "/services",
    label: "Services",
    icon: Briefcase,
    description: "Professional help",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
  },
  {
    to: "/roommate-finder",
    label: "Roommate Finder",
    icon: Users,
    description: "Find roommates",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-600",
  },
];

const STATS = [
  { label: "Properties listed", value: "1,200+" },
  { label: "Cities covered", value: "50+" },
  { label: "Happy renters", value: "8,500+" },
];

export default function Home() {
  const { isAuthenticated, login } = useAuth();
  const { data: featuredListings, isLoading } = useBrowseListings({});
  const { data: profile } = useMyProfile();

  const featured = featuredListings?.slice(0, 6) ?? [];

  return (
    <div className="flex flex-col">
      {/* Authenticated welcome banner */}
      {isAuthenticated && (
        <div
          className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border-b border-accent/20"
          data-ocid="home.welcome_banner.section"
        >
          <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-foreground font-body">
              <span className="text-accent font-semibold">Welcome back</span>
              {profile?.name ? `, ${profile.name}` : ""}!{" "}
              <span className="text-muted-foreground">
                Ready to find your next place?
              </span>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Link to="/profile" data-ocid="home.welcome_profile.link">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-accent hover:text-accent hover:bg-accent/10 h-8"
                >
                  <User className="h-3.5 w-3.5" />
                  My Profile
                </Button>
              </Link>
              <Link to="/post-listing" data-ocid="home.welcome_post.link">
                <Button
                  type="button"
                  size="sm"
                  className="gap-1.5 h-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <ListPlus className="h-3.5 w-3.5" />
                  Post Listing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card border-b border-border/60"
        data-ocid="home.hero.section"
      >
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/assets/generated/hero-rental.dim_1200x600.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-8"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/30" />
        </div>

        {/* Decorative orbs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <Badge className="mb-5 bg-primary/10 text-primary border-primary/25 hover:bg-primary/15 font-body text-xs tracking-wide uppercase shadow-sm">
              ✨ Rentals made simple
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-5 leading-[1.1]">
              Find your perfect
              <br />
              <span className="text-gradient">place to stay</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              Browse flats, hotels, houses, and convention halls across the
              country. List your own property in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/browse" data-ocid="home.browse_cta.button">
                <Button
                  type="button"
                  size="lg"
                  className="gap-2 w-full sm:w-auto bg-gradient-to-r from-accent to-accent/85 hover:from-accent/90 hover:to-accent text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-ring"
                >
                  <Search className="h-5 w-5" />
                  Browse Rentals
                </Button>
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/post-listing"
                  data-ocid="home.post_listing_cta.button"
                >
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="gap-2 w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60 transition-all duration-300"
                  >
                    <ListPlus className="h-5 w-5" />
                    Post a Listing
                  </Button>
                </Link>
              ) : (
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={login}
                  data-ocid="home.signin_cta.button"
                  className="gap-2 w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60 transition-all duration-300"
                >
                  <ListPlus className="h-5 w-5" />
                  List Your Property
                </Button>
              )}
            </div>

            {/* Stats row */}
            <div className="mt-12 flex flex-wrap gap-8">
              {STATS.map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-display font-bold text-3xl text-gradient leading-none">
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1 tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="py-16 bg-background"
        data-ocid="home.categories.section"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-1.5">
                Explore
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Browse by category
              </h2>
            </div>
            <Link to="/browse" data-ocid="home.browse_all_categories.link">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1 text-accent hover:text-accent hidden sm:flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BROWSE_CATEGORIES.map(
              ({ category, icon: Icon, description, bgClass }) => (
                <Link
                  key={category}
                  to="/browse"
                  search={{ category }}
                  data-ocid={`home.category_card.${category}`}
                >
                  <Card className="group cursor-pointer border border-border/60 hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full rounded-xl overflow-hidden">
                    <CardContent className="p-5 flex flex-col gap-3 relative">
                      {/* Subtle background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/3 group-hover:to-accent/3 transition-all duration-500" />
                      <div className="relative">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${bgClass}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="relative">
                        <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                          {CATEGORY_LABELS[category]}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {description}
                        </p>
                      </div>
                      <div className="relative flex items-center gap-1 text-xs text-primary font-medium mt-auto opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                        <span>Browse</span>
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Quick links to other sections */}
      <section className="py-4 pb-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {QUICK_LINKS.map(({ to, label, icon: Icon, description, gradient, iconColor }) => (
              <Link key={to} to={to}>
                <Card className={`group cursor-pointer border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-gradient-to-br ${gradient}`}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/60 shadow-sm ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm">{label}</h3>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="py-16 bg-muted/20 border-y border-border/60 relative overflow-hidden"
        data-ocid="home.how_it_works.section"
      >
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/3 to-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-1.5">
              Simple process
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              How RentEase works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Search,
                step: "1",
                title: "Search & Browse",
                desc: "Filter by category or location to discover listings that match your needs.",
              },
              {
                icon: MapPin,
                step: "2",
                title: "Pick Your Spot",
                desc: "Compare listings, read descriptions, and reach out to property owners.",
              },
              {
                icon: Truck,
                step: "3",
                title: "Move Right In",
                desc: "Contact the owner directly and arrange your viewing or move-in date.",
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div
                key={step}
                className="flex flex-col items-center text-center gap-4 group"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-card border border-border/60 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <Icon className="h-7 w-7 text-primary" />
                  <span className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-[11px] font-bold font-display shadow-md">
                    {step}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section
        className="py-16 bg-background"
        data-ocid="home.featured.section"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-1.5">
                Recently added
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Latest listings
              </h2>
            </div>
            <Link to="/browse" data-ocid="home.view_all.link">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1 text-accent hover:text-accent"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="home.featured.loading_state"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-gradient-to-br from-muted/20 to-muted/5 py-20 gap-5 text-center"
              data-ocid="home.featured.empty_state"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted shadow-inner">
                <Building2 className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1.5 text-lg">
                  No listings yet
                </h3>
                <p className="text-muted-foreground text-sm">
                  Be the first to post a property on RentEase!
                </p>
              </div>
              {isAuthenticated ? (
                <Link to="/post-listing" data-ocid="home.empty_post.button">
                  <Button type="button" className="gap-2 shadow-md">
                    <ListPlus className="h-4 w-4" />
                    Post a Listing
                  </Button>
                </Link>
              ) : (
                <Button
                  type="button"
                  onClick={login}
                  data-ocid="home.empty_signin.button"
                  className="gap-2 shadow-md"
                >
                  Sign in to Post
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((listing, i) => (
                <ListingCard
                  key={listing.id.toString()}
                  listing={listing}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="py-16 relative overflow-hidden"
        data-ocid="home.cta_banner.section"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8" />
        <div className="absolute inset-0 border-t border-primary/10" />
        {/* Decorative orbs */}
        <div className="absolute -top-10 right-1/4 w-40 h-40 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-52 h-52 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 text-center max-w-xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Have a property to rent?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Reach thousands of renters by listing your flat, hotel, house, or
            event space on RentEase.
          </p>
          {isAuthenticated ? (
            <Link to="/post-listing" data-ocid="home.cta_post_listing.button">
              <Button
                type="button"
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ListPlus className="h-5 w-5" />
                Post Your Listing Now
              </Button>
            </Link>
          ) : (
            <Button
              type="button"
              size="lg"
              onClick={login}
              data-ocid="home.cta_signin.button"
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ListPlus className="h-5 w-5" />
              Sign In & List Your Property
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
