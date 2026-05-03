import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, ChevronRight, Home as HomeIcon, Hotel, ListPlus, MapPin, Search, Star, Truck, User, } from "lucide-react";
import { ListingCard, ListingCardSkeleton } from "../components/ListingCard";
import { useAuth } from "../hooks/useAuth";
import { useBrowseListings, useMyProfile } from "../hooks/useBackend";
import { CATEGORY_LABELS, Category } from "../types";
const BROWSE_CATEGORIES = [
    {
        category: Category.flat,
        icon: HomeIcon,
        description: "Affordable city flats",
        bgClass: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
    },
    {
        category: Category.hotel,
        icon: Hotel,
        description: "Short-stay hotels",
        bgClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    },
    {
        category: Category.house,
        icon: Building2,
        description: "Spacious family homes",
        bgClass: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
    },
    {
        category: Category.convention_hall,
        icon: Star,
        description: "Event & meeting spaces",
        bgClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
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
    return (<div className="flex flex-col">
      {/* Authenticated welcome banner */}
      {isAuthenticated && (<div className="bg-accent/10 border-b border-accent/20" data-ocid="home.welcome_banner.section">
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
                <Button type="button" variant="ghost" size="sm" className="gap-1.5 text-accent hover:text-accent hover:bg-accent/10 h-8">
                  <User className="h-3.5 w-3.5"/>
                  My Profile
                </Button>
              </Link>
              <Link to="/post-listing" data-ocid="home.welcome_post.link">
                <Button type="button" size="sm" className="gap-1.5 h-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ListPlus className="h-3.5 w-3.5"/>
                  Post Listing
                </Button>
              </Link>
            </div>
          </div>
        </div>)}

      {/* Hero */}
      <section className="relative overflow-hidden bg-card border-b border-border" data-ocid="home.hero.section">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="/assets/generated/hero-rental.dim_1200x600.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-10"/>
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-card/40"/>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-5 bg-primary/10 text-primary border-primary/25 hover:bg-primary/15 font-body text-xs tracking-wide uppercase">
              Rentals made simple
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-5 leading-tight">
              Find your perfect
              <br />
              <span className="text-primary">place to stay</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              Browse flats, hotels, houses, and convention halls across the
              country. List your own property in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/browse" data-ocid="home.browse_cta.button">
                <Button type="button" size="lg" className="gap-2 w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md">
                  <Search className="h-5 w-5"/>
                  Browse Rentals
                </Button>
              </Link>
              {isAuthenticated ? (<Link to="/post-listing" data-ocid="home.post_listing_cta.button">
                  <Button type="button" size="lg" variant="outline" className="gap-2 w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/5">
                    <ListPlus className="h-5 w-5"/>
                    Post a Listing
                  </Button>
                </Link>) : (<Button type="button" size="lg" variant="outline" onClick={login} data-ocid="home.signin_cta.button" className="gap-2 w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/5">
                  <ListPlus className="h-5 w-5"/>
                  List Your Property
                </Button>)}
            </div>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap gap-6">
              {STATS.map(({ label, value }) => (<div key={label} className="flex flex-col">
                  <span className="font-display font-bold text-2xl text-primary leading-none">
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {label}
                  </span>
                </div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 bg-background" data-ocid="home.categories.section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                Explore
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Browse by category
              </h2>
            </div>
            <Link to="/browse" data-ocid="home.browse_all_categories.link">
              <Button type="button" variant="ghost" size="sm" className="gap-1 text-accent hover:text-accent hidden sm:flex">
                View all
                <ArrowRight className="h-4 w-4"/>
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BROWSE_CATEGORIES.map(({ category, icon: Icon, description, bgClass }) => (<Link key={category} to="/browse" search={{ category }} data-ocid={`home.category_card.${category}`}>
                  <Card className="group cursor-pointer border border-border hover:border-primary/30 hover:shadow-lg transition-smooth h-full">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-smooth ${bgClass}`}>
                        <Icon className="h-5 w-5"/>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                          {CATEGORY_LABELS[category]}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-primary font-medium mt-auto opacity-0 group-hover:opacity-100 transition-smooth">
                        <span>Browse</span>
                        <ChevronRight className="h-3 w-3"/>
                      </div>
                    </CardContent>
                  </Card>
                </Link>))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-muted/30 border-y border-border" data-ocid="home.how_it_works.section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
              Simple process
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              How RentEase works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
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
        ].map(({ icon: Icon, step, title, desc }) => (<div key={step} className="flex flex-col items-center text-center gap-3">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-card border border-border shadow-sm">
                  <Icon className="h-6 w-6 text-primary"/>
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold font-display">
                    {step}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="py-14 bg-background" data-ocid="home.featured.section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                Recently added
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Latest listings
              </h2>
            </div>
            <Link to="/browse" data-ocid="home.view_all.link">
              <Button type="button" variant="ghost" size="sm" className="gap-1 text-accent hover:text-accent">
                View all
                <ChevronRight className="h-4 w-4"/>
              </Button>
            </Link>
          </div>

          {isLoading ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-ocid="home.featured.loading_state">
              {Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <ListingCardSkeleton key={i}/>))}
            </div>) : featured.length === 0 ? (<div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 gap-4 text-center" data-ocid="home.featured.empty_state">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <Building2 className="h-7 w-7 text-muted-foreground/50"/>
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  No listings yet
                </h3>
                <p className="text-muted-foreground text-sm">
                  Be the first to post a property on RentEase!
                </p>
              </div>
              {isAuthenticated ? (<Link to="/post-listing" data-ocid="home.empty_post.button">
                  <Button type="button">
                    <ListPlus className="h-4 w-4 mr-1.5"/>
                    Post a Listing
                  </Button>
                </Link>) : (<Button type="button" onClick={login} data-ocid="home.empty_signin.button">
                  Sign in to Post
                </Button>)}
            </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((listing, i) => (<ListingCard key={listing.id.toString()} listing={listing} index={i}/>))}
            </div>)}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-14 bg-primary/5 border-t border-primary/15" data-ocid="home.cta_banner.section">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Have a property to rent?
          </h2>
          <p className="text-muted-foreground mb-7 leading-relaxed">
            Reach thousands of renters by listing your flat, hotel, house, or
            event space on RentEase.
          </p>
          {isAuthenticated ? (<Link to="/post-listing" data-ocid="home.cta_post_listing.button">
              <Button type="button" size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                <ListPlus className="h-5 w-5"/>
                Post Your Listing Now
              </Button>
            </Link>) : (<Button type="button" size="lg" onClick={login} data-ocid="home.cta_signin.button" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              <ListPlus className="h-5 w-5"/>
              Sign In & List Your Property
            </Button>)}
        </div>
      </section>
    </div>);
}
