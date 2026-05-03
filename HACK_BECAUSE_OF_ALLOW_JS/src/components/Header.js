import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigation } from "./Navigation";
export function Header() {
    const { isAuthenticated, isLoading, login, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    return (<header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-xs">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" data-ocid="nav.home.link" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-primary-foreground font-display font-bold text-sm">
              R
            </span>
          </div>
          <span className="font-display font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
            RentEase
          </span>
        </Link>

        {/* Desktop nav */}
        {isAuthenticated && <Navigation />}

        {/* Desktop auth actions */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (<>
              <Link to="/profile" data-ocid="nav.profile.link">
                <Button type="button" variant="ghost" size="sm" className="gap-1.5">
                  <User className="h-4 w-4"/>
                  Profile
                </Button>
              </Link>
              <Button type="button" variant="outline" size="sm" onClick={logout} data-ocid="auth.logout_button" className="gap-1.5">
                <LogOut className="h-4 w-4"/>
                Sign out
              </Button>
            </>) : (<Button onClick={login} disabled={isLoading} size="sm" data-ocid="auth.login_button" className="gap-1.5">
              <LogIn className="h-4 w-4"/>
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>)}
        </div>

        {/* Mobile hamburger */}
        {isAuthenticated && (<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" data-ocid="nav.mobile_menu.toggle">
                {mobileOpen ? (<X className="h-5 w-5"/>) : (<Menu className="h-5 w-5"/>)}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card p-0" data-ocid="nav.mobile_menu.sheet">
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                    <span className="text-primary-foreground font-display font-bold text-xs">
                      R
                    </span>
                  </div>
                  <span className="font-display font-bold text-lg text-foreground">
                    RentEase
                  </span>
                </div>

                {/* Mobile nav */}
                <div className="flex-1 px-4 py-4">
                  <Navigation orientation="vertical" onNavigate={() => setMobileOpen(false)}/>
                </div>

                {/* Mobile auth */}
                <div className="px-4 py-4 border-t border-border">
                  {isAuthenticated ? (<Button variant="outline" className="w-full gap-2" onClick={() => {
                    logout();
                    setMobileOpen(false);
                }} data-ocid="auth.mobile_logout_button">
                      <LogOut className="h-4 w-4"/>
                      Sign out
                    </Button>) : (<Button className="w-full gap-2" onClick={() => {
                    login();
                    setMobileOpen(false);
                }} disabled={isLoading} data-ocid="auth.mobile_login_button">
                      <LogIn className="h-4 w-4"/>
                      {isLoading
                    ? "Signing in…"
                    : "Sign in with Email"}
                    </Button>)}
                </div>
              </div>
            </SheetContent>
          </Sheet>)}
      </div>
    </header>);
}
