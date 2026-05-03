import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "./useAuth";
// Change this to match your Spring Boot backend port
const API_BASE_URL = "http://localhost:8080/api";
async function fetchWithAuth(endpoint, options = {}) {
    const token = useAuthStore.getState().token;
    const userId = useAuthStore.getState().userId;
    const headers = new Headers(options.headers);
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    if (userId) {
        headers.set("X-User-Id", userId);
    }
    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
    if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
    }
    // Handle empty responses
    if (res.status === 204)
        return null;
    return res.json();
}
export function useBrowseListings(filter) {
    return useQuery({
        queryKey: ["browse", filter],
        queryFn: async () => {
            // Build query string from filter
            const params = new URLSearchParams();
            if (filter.locationQuery)
                params.set("location", filter.locationQuery);
            if (filter.searchQuery)
                params.set("searchQuery", filter.searchQuery);
            if (filter.category)
                params.set("category", filter.category);
            const queryString = params.toString();
            const url = `/listings${queryString ? `?${queryString}` : ''}`;
            return fetchWithAuth(url);
        },
    });
}
export function useGetListing(id) {
    return useQuery({
        queryKey: ["listing", id],
        queryFn: async () => {
            if (id == null)
                return null;
            return fetchWithAuth(`/listings/${id}`);
        },
        enabled: id != null,
    });
}
export function useMyListings() {
    const isAuthenticated = useAuthStore(s => s.isAuthenticated);
    return useQuery({
        queryKey: ["myListings"],
        queryFn: async () => {
            return fetchWithAuth("/listings/my");
        },
        enabled: isAuthenticated,
    });
}
export function useMyProfile() {
    const isAuthenticated = useAuthStore(s => s.isAuthenticated);
    return useQuery({
        queryKey: ["myProfile"],
        queryFn: async () => {
            return fetchWithAuth("/profile");
        },
        enabled: isAuthenticated,
    });
}
export function useUpsertProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input) => {
            return fetchWithAuth("/profile", {
                method: "POST", // Or PUT depending on your backend
                body: JSON.stringify(input)
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
        },
    });
}
export function useCreateListing() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input) => {
            return fetchWithAuth("/listings", {
                method: "POST",
                body: JSON.stringify(input)
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myListings"] });
            queryClient.invalidateQueries({ queryKey: ["browse"] });
        },
    });
}
export function useUpdateListing() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, input }) => {
            return fetchWithAuth(`/listings/${id}`, {
                method: "PUT",
                body: JSON.stringify(input)
            });
        },
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["listing", id] });
            queryClient.invalidateQueries({ queryKey: ["myListings"] });
            queryClient.invalidateQueries({ queryKey: ["browse"] });
        },
    });
}
export function useDeleteListing() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            return fetchWithAuth(`/listings/${id}`, {
                method: "DELETE"
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myListings"] });
            queryClient.invalidateQueries({ queryKey: ["browse"] });
        },
    });
}
