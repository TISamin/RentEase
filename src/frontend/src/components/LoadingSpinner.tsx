interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
};

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block rounded-full border-border border-t-primary animate-spin ${sizeClasses[size]} ${className}`}
    />
  );
}

export function LoadingPage() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      data-ocid="loading_state"
    >
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}
