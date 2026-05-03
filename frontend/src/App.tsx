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
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border max-w-md w-full animate-in fade-in zoom-in duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <span className="text-primary font-display font-bold text-xl">R</span>
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Welcome to RentEase</h2>
              <p className="text-muted-foreground mb-6">
                Please log in or create an account to access the platform.
              </p>
              <button 
                onClick={login}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
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
