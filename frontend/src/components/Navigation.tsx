import { Link, useRouterState } from "@tanstack/react-router";
import { Home, PlusSquare, Search, User, ShoppingBag, Briefcase, Users } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  protected?: boolean;
}

const navItems: NavItem[] = [
  { to: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
  {
    to: "/browse",
    label: "Browse Rentals",
    icon: <Search className="h-4 w-4" />,
  },
  {
    to: "/marketplace",
    label: "Marketplace",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    to: "/services",
    label: "Services",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    to: "/roommate-finder",
    label: "Roommate Finder",
    icon: <Users className="h-4 w-4" />,
  },
  {
    to: "/post-listing",
    label: "Post Listing",
    icon: <PlusSquare className="h-4 w-4" />,
    protected: true,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: <User className="h-4 w-4" />,
    protected: true,
  },
];

interface NavigationProps {
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
}

export function Navigation({
  onNavigate,
  orientation = "horizontal",
}: NavigationProps) {
  const { isAuthenticated } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const visibleItems = navItems.filter(
    (item) => !item.protected || isAuthenticated,
  );

  if (orientation === "vertical") {
    return (
      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        {visibleItems.map((item) => {
          const isActive =
            item.to === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-primary/10 to-accent/5 text-primary shadow-sm"
                  : "text-foreground/70 hover:bg-muted/70 hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Main navigation"
      className="hidden md:flex items-center gap-0.5"
    >
      {visibleItems.map((item) => {
        const isActive =
          item.to === "/"
            ? currentPath === "/"
            : currentPath.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
            className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
