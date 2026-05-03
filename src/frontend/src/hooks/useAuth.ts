import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  userId: string | null;
  loginStatus: "idle" | "initializing" | "logging-in" | "success" | "error";
  email: string | null;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  sendOtp: (email: string) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  setPassword: (email: string, password: string) => Promise<boolean>;
  loginWithPassword: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      token: null,
      userId: null,
      loginStatus: "idle",
      email: null,
      loginModalOpen: false,
      setLoginModalOpen: (open) => set({ loginModalOpen: open }),
      sendOtp: async (email: string) => {
        set({ isLoading: true });
        try {
          const res = await fetch("http://localhost:8080/api/auth/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          set({ isLoading: false });
          return res.ok;
        } catch (e) {
          set({ isLoading: false });
          return false;
        }
      },
      verifyOtp: async (email: string, otp: string) => {
        set({ isLoading: true });
        
        try {
          const res = await fetch("http://localhost:8080/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
          });
          
          set({ isLoading: false });
          return res.ok;
        } catch (err) {
          set({ isLoading: false });
          return false;
        }
      },
      setPassword: async (email: string, password: string) => {
        set({ isLoading: true, loginStatus: "logging-in" });
        try {
          const res = await fetch("http://localhost:8080/api/auth/set-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) throw new Error("Failed to set password");
          
          const data = await res.json();
          set({
            isAuthenticated: true,
            isLoading: false,
            token: data.token,
            userId: data.userId,
            loginStatus: "success",
            email,
            loginModalOpen: false,
          });
          return true;
        } catch (err) {
          set({ isLoading: false, loginStatus: "error" });
          return false;
        }
      },
      loginWithPassword: async (email: string, password: string) => {
        set({ isLoading: true, loginStatus: "logging-in" });
        try {
          const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) throw new Error("Invalid credentials");
          
          const data = await res.json();
          set({
            isAuthenticated: true,
            isLoading: false,
            token: data.token,
            userId: data.userId,
            loginStatus: "success",
            email,
            loginModalOpen: false,
          });
          return true;
        } catch (err) {
          set({ isLoading: false, loginStatus: "error" });
          return false;
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          userId: null,
          loginStatus: "idle",
          email: null,
        });
      },
    }),
    {
      name: "rentease-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        email: state.email,
        token: state.token,
        userId: state.userId,
      })
    },
  ),
);

export function useAuth() {
  const store = useAuthStore();
  return {
    login: () => store.setLoginModalOpen(true),
    logout: store.logout,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    loginStatus: store.loginStatus,
    token: store.token,
    userId: store.userId,
    email: store.email,
  };
}
