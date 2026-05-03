import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, L as Link, B as Button, U as User, S as Search, H as House } from "./index-BXEpZzQv.js";
import { B as Badge } from "./badge-Bs8Yw0hg.js";
import { u as useBrowseListings, a as useMyProfile, C as Category, b as Card, c as CardContent, d as CATEGORY_LABELS, M as MapPin } from "./useBackend-BwHj800f.js";
import { B as Building2, L as ListingCardSkeleton, a as ListingCard } from "./ListingCard-CSMUJvLN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
    ["path", { d: "M10 22v-6.57", key: "1wmca3" }],
    ["path", { d: "M12 11h.01", key: "z322tv" }],
    ["path", { d: "M12 7h.01", key: "1ivr5q" }],
    ["path", { d: "M14 15.43V22", key: "1q2vjd" }],
    ["path", { d: "M15 16a5 5 0 0 0-6 0", key: "o9wqvi" }],
    ["path", { d: "M16 11h.01", key: "xkw8gn" }],
    ["path", { d: "M16 7h.01", key: "1kdx03" }],
    ["path", { d: "M8 11h.01", key: "1dfujw" }],
    ["path", { d: "M8 7h.01", key: "1vti4s" }],
    ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
];
const Hotel = createLucideIcon("hotel", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
    ["path", { d: "M11 12H3", key: "51ecnj" }],
    ["path", { d: "M16 6H3", key: "1wxfjs" }],
    ["path", { d: "M16 18H3", key: "12xzn7" }],
    ["path", { d: "M18 9v6", key: "1twb98" }],
    ["path", { d: "M21 12h-6", key: "bt1uis" }]
];
const ListPlus = createLucideIcon("list-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
    ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
    ["path", { d: "M15 18H9", key: "1lyqi6" }],
    [
        "path",
        {
            d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
            key: "lysw3i"
        }
    ],
    ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
    ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const BROWSE_CATEGORIES = [
    {
        category: Category.flat,
        icon: House,
        description: "Affordable city flats",
        bgClass: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"
    },
    {
        category: Category.hotel,
        icon: Hotel,
        description: "Short-stay hotels",
        bgClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
    },
    {
        category: Category.house,
        icon: Building2,
        description: "Spacious family homes",
        bgClass: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"
    },
    {
        category: Category.convention_hall,
        icon: Star,
        description: "Event & meeting spaces",
        bgClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
    }
];
const STATS = [
    { label: "Properties listed", value: "1,200+" },
    { label: "Cities covered", value: "50+" },
    { label: "Happy renters", value: "8,500+" }
];
function Home() {
    const { isAuthenticated, login } = useAuth();
    const { data: featuredListings, isLoading } = useBrowseListings({});
    const { data: profile } = useMyProfile();
    const featured = (featuredListings == null ? void 0 : featuredListings.slice(0, 6)) ?? [];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "bg-accent/10 border-b border-accent/20",
                "data-ocid": "home.welcome_banner.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-body", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold", children: "Welcome back" }),
                                (profile == null ? void 0 : profile.name) ? `, ${profile.name}` : "",
                                "!",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Ready to find your next place?" })
                            ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", "data-ocid": "home.welcome_profile.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        className: "gap-1.5 text-accent hover:text-accent hover:bg-accent/10 h-8",
                                        children: [
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
                                            "My Profile"
                                        ]
                                    }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-listing", "data-ocid": "home.welcome_post.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                        type: "button",
                                        size: "sm",
                                        className: "gap-1.5 h-8 bg-primary hover:bg-primary/90 text-primary-foreground",
                                        children: [
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "h-3.5 w-3.5" }),
                                            "Post Listing"
                                        ]
                                    }) })
                            ] })
                    ] })
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", {
                className: "relative overflow-hidden bg-card border-b border-border",
                "data-ocid": "home.hero.section",
                children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
                                src: "/assets/generated/hero-rental.dim_1200x600.jpg",
                                alt: "",
                                "aria-hidden": "true",
                                className: "h-full w-full object-cover opacity-10"
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-card via-card/80 to-card/40" })
                        ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 sm:px-6 py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-5 bg-primary/10 text-primary border-primary/25 hover:bg-primary/15 font-body text-xs tracking-wide uppercase", children: "Rentals made simple" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-5 leading-tight", children: [
                                        "Find your perfect",
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "place to stay" })
                                    ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed max-w-xl", children: "Browse flats, hotels, houses, and convention halls across the country. List your own property in minutes." }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "home.browse_cta.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                                type: "button",
                                                size: "lg",
                                                className: "gap-2 w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md",
                                                children: [
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }),
                                                    "Browse Rentals"
                                                ]
                                            }) }),
                                        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
                                            to: "/post-listing",
                                            "data-ocid": "home.post_listing_cta.button",
                                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                                type: "button",
                                                size: "lg",
                                                variant: "outline",
                                                className: "gap-2 w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/5",
                                                children: [
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "h-5 w-5" }),
                                                    "Post a Listing"
                                                ]
                                            })
                                        }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                            type: "button",
                                            size: "lg",
                                            variant: "outline",
                                            onClick: login,
                                            "data-ocid": "home.signin_cta.button",
                                            className: "gap-2 w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/5",
                                            children: [
                                                /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "h-5 w-5" }),
                                                "List Your Property"
                                            ]
                                        })
                                    ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-wrap gap-6", children: STATS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-primary leading-none", children: value }),
                                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-0.5", children: label })
                                        ] }, label)) })
                            ] }) })
                ]
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
                className: "py-14 bg-background",
                "data-ocid": "home.categories.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1", children: "Explore" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "Browse by category" })
                                    ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "home.browse_all_categories.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        className: "gap-1 text-accent hover:text-accent hidden sm:flex",
                                        children: [
                                            "View all",
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                                        ]
                                    }) })
                            ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: BROWSE_CATEGORIES.map(({ category, icon: Icon, description, bgClass }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
                                to: "/browse",
                                search: { category },
                                "data-ocid": `home.category_card.${category}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group cursor-pointer border border-border hover:border-primary/30 hover:shadow-lg transition-smooth h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3", children: [
                                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                                                className: `flex h-11 w-11 items-center justify-center rounded-xl transition-smooth ${bgClass}`,
                                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" })
                                            }),
                                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight", children: CATEGORY_LABELS[category] }),
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })
                                                ] }),
                                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-primary font-medium mt-auto opacity-0 group-hover:opacity-100 transition-smooth", children: [
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Browse" }),
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                                                ] })
                                        ] }) })
                            }, category)) })
                    ] })
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
                className: "py-14 bg-muted/30 border-y border-border",
                "data-ocid": "home.how_it_works.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1", children: "Simple process" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "How RentEase works" })
                            ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto", children: [
                                {
                                    icon: Search,
                                    step: "1",
                                    title: "Search & Browse",
                                    desc: "Filter by category or location to discover listings that match your needs."
                                },
                                {
                                    icon: MapPin,
                                    step: "2",
                                    title: "Pick Your Spot",
                                    desc: "Compare listings, read descriptions, and reach out to property owners."
                                },
                                {
                                    icon: Truck,
                                    step: "3",
                                    title: "Move Right In",
                                    desc: "Contact the owner directly and arrange your viewing or move-in date."
                                }
                            ].map(({ icon: Icon, step, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                                className: "flex flex-col items-center text-center gap-3",
                                children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-14 w-14 items-center justify-center rounded-2xl bg-card border border-border shadow-sm", children: [
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary" }),
                                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold font-display", children: step })
                                        ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: title }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: desc })
                                ]
                            }, step)) })
                    ] })
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
                className: "py-14 bg-background",
                "data-ocid": "home.featured.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1", children: "Recently added" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "Latest listings" })
                                    ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "home.view_all.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        className: "gap-1 text-accent hover:text-accent",
                                        children: [
                                            "View all",
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                                        ]
                                    }) })
                            ] }),
                        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                            "data-ocid": "home.featured.loading_state",
                            children: Array.from({ length: 6 }).map((_, i) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCardSkeleton, {}, i)))
                        }) : featured.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                            className: "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 gap-4 text-center",
                            "data-ocid": "home.featured.empty_state",
                            children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-7 w-7 text-muted-foreground/50" }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: "No listings yet" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Be the first to post a property on RentEase!" })
                                    ] }),
                                isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-listing", "data-ocid": "home.empty_post.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", children: [
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "h-4 w-4 mr-1.5" }),
                                            "Post a Listing"
                                        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                    type: "button",
                                    onClick: login,
                                    "data-ocid": "home.empty_signin.button",
                                    children: "Sign in to Post"
                                })
                            ]
                        }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: featured.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCard, {
                                listing,
                                index: i
                            }, listing.id.toString())) })
                    ] })
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
                className: "py-14 bg-primary/5 border-t border-primary/15",
                "data-ocid": "home.cta_banner.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 text-center max-w-xl", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground mb-3", children: "Have a property to rent?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-7 leading-relaxed", children: "Reach thousands of renters by listing your flat, hotel, house, or event space on RentEase." }),
                        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-listing", "data-ocid": "home.cta_post_listing.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                type: "button",
                                size: "lg",
                                className: "gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md",
                                children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "h-5 w-5" }),
                                    "Post Your Listing Now"
                                ]
                            }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                            type: "button",
                            size: "lg",
                            onClick: login,
                            "data-ocid": "home.cta_signin.button",
                            className: "gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md",
                            children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "h-5 w-5" }),
                                "Sign In & List Your Property"
                            ]
                        })
                    ] })
            })
        ] });
}
export { Home as default };
