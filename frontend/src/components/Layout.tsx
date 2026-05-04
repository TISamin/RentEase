import { Toaster } from "@/components/ui/sonner";
import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { LoginModal } from "./LoginModal";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <footer className="relative bg-card border-t border-border/60 overflow-hidden">
        {/* Subtle gradient accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 py-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm group-hover:shadow-md transition-all duration-300">
                  <span className="text-primary-foreground font-display font-bold text-xs">
                    R
                  </span>
                </div>
                <span className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                  RentEase
                </span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Your one-stop platform for finding flats, hotels, houses, services, and roommates.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
              <Link to="/browse" className="text-muted-foreground hover:text-primary transition-colors duration-200 py-1">
                Browse Rentals
              </Link>
              <Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors duration-200 py-1">
                Marketplace
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors duration-200 py-1">
                Services
              </Link>
              <Link to="/roommate-finder" className="text-muted-foreground hover:text-primary transition-colors duration-200 py-1">
                Roommate Finder
              </Link>
              <Link to="/post-listing" className="text-muted-foreground hover:text-primary transition-colors duration-200 py-1">
                Post Listing
              </Link>
              <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors duration-200 py-1">
                Profile
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} RentEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <Toaster richColors position="top-right" />
      <LoginModal />
    </div>
  );
}
