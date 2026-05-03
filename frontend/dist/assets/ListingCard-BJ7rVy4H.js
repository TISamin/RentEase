import { c as createLucideIcon, j as jsxRuntimeExports, L as Link } from "./index-CYfAcN1s.js";
import { b as Card, c as CardContent, d as CATEGORY_LABELS, M as MapPin, P as Phone } from "./useBackend-DhQTVAua.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode);
function getCategoryVariantClass(category) {
  const map = {
    flat: "bg-accent/15 text-accent border-accent/30",
    hotel: "bg-primary/15 text-primary border-primary/30",
    house: "bg-secondary text-secondary-foreground border-border",
    convention_hall: "bg-muted text-muted-foreground border-border",
    shifting_service: "bg-primary/10 text-primary border-primary/20"
  };
  return map[category] ?? "bg-muted text-muted-foreground border-border";
}
function getImageUrl(imageKeys) {
  if (!imageKeys || imageKeys.length === 0) return null;
  const key = imageKeys[0];
  if (key && key.length > 0) return key;
  return null;
}
function ListingCard({ listing, index = 0 }) {
  const imageUrl = getImageUrl(listing.imageKeys);
  const categoryLabel = CATEGORY_LABELS[listing.category] ?? listing.category;
  const categoryClass = getCategoryVariantClass(listing.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/listings/$id",
      params: { id: listing.id.toString() },
      "data-ocid": `listing.item.${index + 1}`,
      className: "block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border border-border shadow-xs hover:shadow-md transition-smooth group-hover:-translate-y-0.5 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
          imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: listing.name,
              className: "h-full w-full object-cover transition-smooth group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full items-center justify-center bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/listing-placeholder.jpg",
                alt: "Property placeholder",
                className: "h-full w-full object-cover opacity-60",
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "h-10 w-10 text-muted-foreground/40",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 1.5,
                      d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 10.5h18"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/50", children: "No image" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${categoryClass}`,
              children: categoryLabel
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200", children: listing.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: listing.location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed", children: listing.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mt-auto pt-1 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: listing.contactPhone })
          ] })
        ] })
      ] })
    }
  );
}
function ListingCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-muted animate-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-3/4 rounded bg-muted animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 rounded bg-muted animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full rounded bg-muted animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-5/6 rounded bg-muted animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/3 rounded bg-muted animate-pulse mt-1" })
    ] })
  ] });
}
export {
  Building2 as B,
  ListingCardSkeleton as L,
  ListingCard as a
};
