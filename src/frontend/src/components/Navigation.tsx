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
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Main navigation"
      className="hidden md:flex items-center gap-1"
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
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-smooth ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-foreground/70 hover:bg-muted hover:text-foreground"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
