import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { LoadingPage } from "./components/LoadingSpinner";
import { useAuth } from "./hooks/useAuth";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const BrowsePage = lazy(() => import("./pages/Browse"));
const ListingDetailPage = lazy(() => import("./pages/ListingDetail"));
const PostListingPage = lazy(() => import("./pages/PostListing"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const MarketplacePage = lazy(() => import("./pages/Marketplace"));
const ServicesPage = lazy(() => import("./pages/Services"));
const RoommateFinderPage = lazy(() => import("./pages/RoommateFinder"));

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingPage />;
  if (!isAuthenticated) return <Navigate to="/" />;
  return <>{children}</>;
}

// Root layout route
const rootRoute = createRootRoute({
  component: () => {
    const { isAuthenticated, isLoading, login } = useAuth();

    if (isLoading) {
      return (
        <Layout>
          <LoadingPage />
        </Layout>
      );
    }

    if (!isAuthenticated) {
      return (
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 relative">
            {/* Decorative background orbs */}
            <div className="absolute -top-20 left-1/4 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 right-1/4 w-52 h-52 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative bg-card/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-xl border border-border/60 max-w-md w-full animate-fade-in-up">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-5 shadow-lg">
                <span className="text-primary-foreground font-display font-bold text-xl">R</span>
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Welcome to <span className="text-gradient">RentEase</span></h2>
              <p className="text-muted-foreground mb-7 leading-relaxed">
                Please log in or create an account to access the platform.
              </p>
              <button 
                onClick={login}
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary h-11 px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Log In / Sign Up
              </button>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </Layout>
    );
  },
});

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: BrowsePage,
});

const listingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings/$id",
  component: ListingDetailPage,
});

const postListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post-listing",
  component: () => (
    <ProtectedRoute>
      <PostListingPage />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/marketplace",
  component: MarketplacePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const roommateFinderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/roommate-finder",
  component: RoommateFinderPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  browseRoute,
  listingDetailRoute,
  postListingRoute,
  profileRoute,
  marketplaceRoute,
  servicesRoute,
  roommateFinderRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
