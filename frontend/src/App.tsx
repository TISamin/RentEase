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
  component: () => (
    <Layout>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
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
