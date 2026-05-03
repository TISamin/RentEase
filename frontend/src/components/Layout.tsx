import { Toaster } from "@/components/ui/sonner";
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
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <span className="text-primary-foreground font-display font-bold text-xs">
                R
              </span>
            </div>
            <span className="font-display font-semibold text-foreground">
              RentEase
            </span>
          </div>
          <p>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
      <Toaster richColors position="top-right" />
      <LoginModal />
    </div>
  );
}
