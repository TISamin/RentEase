import { c as createLucideIcon, a as useParams, b as useNavigate, u as useAuth, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, d as ue } from "./index-BY_OZy-O.js";
import { A as AlertDialog, a as AlertDialogTrigger, T as Trash2, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction, S as Skeleton } from "./skeleton-yqloxson.js";
import { B as Badge } from "./badge-BPaSdT0m.js";
import { e as useGetListing, f as useDeleteListing, M as MapPin, d as CATEGORY_LABELS, g as CATEGORY_COLORS, b as Card, c as CardContent, P as Phone } from "./useBackend-9304Zg1N.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function GalleryImage({
  imageKey,
  alt,
  className,
  onClick,
  isActive
}) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: image thumbnail click handled via keyboard elsewhere
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: imageKey,
        alt,
        className: `${className ?? ""} object-cover transition-smooth cursor-pointer ${isActive ? "ring-2 ring-primary ring-offset-2" : ""}`,
        onClick
      }
    )
  );
}
function ListingDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 sm:px-6 py-8 max-w-5xl",
      "data-ocid": "listing_detail.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-lg" }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40 mt-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }) })
        ] })
      ]
    }
  );
}
function ListingDetail() {
  const { id } = useParams({ from: "/listings/$id" });
  const listingId = BigInt(id);
  const navigate = useNavigate();
  const { principal } = useAuth();
  const { data: listing, isLoading, error } = useGetListing(listingId);
  const deleteListing = useDeleteListing();
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const [deleteOpen, setDeleteOpen] = reactExports.useState(false);
  const handleDelete = async () => {
    try {
      await deleteListing.mutateAsync(listingId);
      ue.success("Listing deleted successfully");
      navigate({ to: "/browse" });
    } catch {
      ue.error("Failed to delete listing. Please try again.");
    }
    setDeleteOpen(false);
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ListingDetailSkeleton, {});
  if (error || !listing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 sm:px-6 py-20 flex flex-col items-center gap-4 text-center",
        "data-ocid": "listing_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-8 w-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Listing not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "This listing may have been removed or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "listing_detail.back.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Browse"
          ] }) })
        ]
      }
    );
  }
  const categoryLabel = CATEGORY_LABELS[listing.category] ?? String(listing.category);
  const categoryColor = CATEGORY_COLORS[listing.category] ?? "bg-muted text-muted-foreground";
  const datePosted = new Date(
    Number(listing.createdAt) / 1e6
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const isOwner = principal != null && listing.owner.compareTo(principal) === "eq";
  const imageKeys = listing.imageKeys;
  const hasImages = imageKeys.length > 0;
  const safeIndex = Math.min(activeIndex, Math.max(0, imageKeys.length - 1));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", "data-ocid": "listing_detail.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-8 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "listing_detail.back.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "gap-2 -ml-2 text-accent hover:text-accent hover:bg-accent/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Browse"
          ]
        }
      ) }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-2",
          "data-ocid": "listing_detail.owner_actions.panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { open: deleteOpen, onOpenChange: setDeleteOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "destructive",
                size: "sm",
                className: "gap-2",
                "data-ocid": "listing_detail.delete.open_modal_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
                  "Delete"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "listing_detail.delete.dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this listing?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "This will permanently remove",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: listing.name }),
                  " and cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "listing_detail.delete.cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleDelete,
                    disabled: deleteListing.isPending,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "listing_detail.delete.confirm_button",
                    children: deleteListing.isPending ? "Deleting…" : "Yes, delete"
                  }
                )
              ] })
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aspect-video overflow-hidden rounded-xl bg-muted border border-border shadow-sm",
            "data-ocid": "listing_detail.gallery.panel",
            children: hasImages ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              GalleryImage,
              {
                imageKey: imageKeys[safeIndex],
                alt: `${listing.name} — image ${safeIndex + 1}`,
                className: "h-full w-full"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-full flex flex-col items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-10 w-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No images available" })
            ] })
          }
        ),
        imageKeys.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-4 sm:grid-cols-5 gap-2",
            "data-ocid": "listing_detail.thumbnails.list",
            children: imageKeys.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": `View image ${i + 1}`,
                onClick: () => setActiveIndex(i),
                className: `aspect-square overflow-hidden rounded-lg border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${i === safeIndex ? "border-primary shadow-sm" : "border-border hover:border-primary/50"}`,
                "data-ocid": `listing_detail.thumbnail.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GalleryImage,
                  {
                    imageKey: key,
                    alt: `${listing.name} thumbnail ${i + 1}`,
                    isActive: i === safeIndex,
                    className: "h-full w-full"
                  }
                )
              },
              key
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg mb-3", children: "About this listing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 leading-relaxed whitespace-pre-line", children: listing.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border border-border shadow-sm sticky top-6",
          "data-ocid": "listing_detail.info.card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `self-start text-xs font-semibold ${categoryColor}`,
                children: categoryLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: listing.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 shrink-0 text-accent mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: listing.location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Posted ",
                datePosted
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider", children: "Contact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${listing.contactPhone}`,
                  className: "flex items-center gap-2 text-primary font-semibold hover:underline transition-colors duration-200 text-sm",
                  "data-ocid": "listing_detail.contact_phone.link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 shrink-0" }),
                    listing.contactPhone
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${listing.contactPhone}`, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
                "data-ocid": "listing_detail.call.primary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
                  "Call Now"
                ]
              }
            ) })
          ] })
        }
      ) })
    ] })
  ] }) });
}
export {
  ListingDetail as default
};
