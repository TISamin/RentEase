import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, U as User, B as Button, r as reactExports, h as Label, I as Input, L as Link, e as ue } from "./index-BXEpZzQv.js";
import { S as Skeleton, A as AlertDialog, a as AlertDialogTrigger, T as Trash2, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./skeleton-fS7VzXjV.js";
import { b as Card, c as CardContent, a as useMyProfile, i as useUpsertProfile, j as CardHeader, k as CardTitle, l as useMyListings, f as useDeleteListing } from "./useBackend-BwHj800f.js";
import { B as Building2, L as ListingCardSkeleton, a as ListingCard } from "./ListingCard-CSMUJvLN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
    [
        "path",
        {
            d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
            key: "1a8usu"
        }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function ProfileForm() {
    const { data: profile, isLoading } = useMyProfile();
    const { mutateAsync: upsert, isPending, isError } = useUpsertProfile();
    const [name, setName] = reactExports.useState("");
    const [email, setEmail] = reactExports.useState("");
    const [address, setAddress] = reactExports.useState("");
    const [phone, setPhone] = reactExports.useState("");
    reactExports.useEffect(() => {
        if (profile) {
            setName(profile.name);
            setEmail(profile.email);
            setAddress(profile.address);
            setPhone(profile.phone);
        }
    }, [profile]);
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await upsert({ name, email, address, phone });
            ue.success("Profile saved successfully.");
        }
        catch {
            ue.error("Failed to save profile. Please try again.");
        }
    }
    if (isLoading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.form_loading_state", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
                        [...Array(4)].map((_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
                            ] }, i))),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-32" })
                    ] })
            ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.form_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
                        "Personal Information"
                    ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", noValidate: true, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Full Name" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                            id: "profile-name",
                                            name: "name",
                                            value: name,
                                            onChange: (e) => setName(e.target.value),
                                            placeholder: "Your full name",
                                            autoComplete: "name",
                                            "data-ocid": "profile.name_input"
                                        })
                                    ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-phone", children: "Phone Number" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                            id: "profile-phone",
                                            name: "phone",
                                            type: "tel",
                                            value: phone,
                                            onChange: (e) => setPhone(e.target.value),
                                            placeholder: "+880 1XXX-XXXXXX",
                                            autoComplete: "tel",
                                            "data-ocid": "profile.phone_input"
                                        })
                                    ] })
                            ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-email", children: "Email Address" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                    id: "profile-email",
                                    name: "email",
                                    type: "email",
                                    value: email,
                                    onChange: (e) => setEmail(e.target.value),
                                    placeholder: "you@example.com",
                                    autoComplete: "email",
                                    "data-ocid": "profile.email_input"
                                })
                            ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-address", children: "Address" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                    id: "profile-address",
                                    name: "address",
                                    value: address,
                                    onChange: (e) => setAddress(e.target.value),
                                    placeholder: "Street, city, district",
                                    autoComplete: "street-address",
                                    "data-ocid": "profile.address_input"
                                })
                            ] }),
                        isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                            className: "text-sm text-destructive",
                            role: "alert",
                            "data-ocid": "profile.form_error_state",
                            children: "Something went wrong. Please try again."
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                            type: "submit",
                            disabled: isPending,
                            "data-ocid": "profile.save_button",
                            className: "w-full sm:w-auto",
                            children: isPending ? "Saving…" : "Save Changes"
                        })
                    ] }) })
        ] });
}
function MyListingsSection() {
    const { data: listings, isLoading } = useMyListings();
    const { mutateAsync: deleteListing } = useDeleteListing();
    async function handleDelete(id) {
        try {
            await deleteListing(id);
            ue.success("Listing deleted.");
        }
        catch {
            ue.error("Failed to delete listing.");
        }
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", {
        "aria-labelledby": "my-listings-heading",
        "data-ocid": "profile.listings_section",
        children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between gap-3 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
                        id: "my-listings-heading",
                        className: "font-display text-xl font-semibold text-foreground",
                        children: "My Listings"
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "profile.post_listing_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/post-listing", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }),
                                "Post New"
                            ] }) })
                ] }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                "data-ocid": "profile.listings_loading_state",
                children: [...Array(3)].map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCardSkeleton, {}, i)))
            }) : !listings || listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                className: "flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/20 py-14",
                "data-ocid": "profile.listings_empty_state",
                children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, {
                            className: "h-8 w-8 text-muted-foreground",
                            "aria-hidden": "true"
                        }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No listings yet" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Post your first property or service and reach thousands of potential renters." })
                        ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "profile.listings_empty_add_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-listing", children: "Post a Listing" }) })
                ]
            }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: listings.map((listing, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                    className: "relative group/card",
                    "data-ocid": `profile.listing.item.${idx + 1}`,
                    children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCard, { listing, index: idx }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-smooth pointer-events-none group-hover/card:pointer-events-auto", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                    type: "button",
                                    size: "icon",
                                    variant: "secondary",
                                    asChild: true,
                                    className: "h-8 w-8 shadow-md",
                                    "aria-label": `Edit listing ${listing.name}`,
                                    "data-ocid": `profile.listing.edit_button.${idx + 1}`,
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
                                        to: "/post-listing",
                                        search: { edit: listing.id.toString() },
                                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                                    })
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                                type: "button",
                                                size: "icon",
                                                variant: "destructive",
                                                className: "h-8 w-8 shadow-md",
                                                "aria-label": `Delete listing ${listing.name}`,
                                                "data-ocid": `profile.listing.delete_button.${idx + 1}`,
                                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                                            }) }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, {
                                            "data-ocid": `profile.delete_listing.dialog.${idx + 1}`,
                                            children: [
                                                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this listing?" }),
                                                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                                                                "This will permanently remove “",
                                                                listing.name,
                                                                "”. This action cannot be undone."
                                                            ] })
                                                    ] }),
                                                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, {
                                                            "data-ocid": `profile.delete_listing.cancel_button.${idx + 1}`,
                                                            children: "Cancel"
                                                        }),
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, {
                                                            onClick: () => handleDelete(listing.id),
                                                            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                                                            "data-ocid": `profile.delete_listing.confirm_button.${idx + 1}`,
                                                            children: "Delete"
                                                        })
                                                    ] })
                                            ]
                                        })
                                    ] })
                            ] })
                    ]
                }, listing.id.toString())) })
        ]
    });
}
function ProfilePage() {
    const { isAuthenticated, isLoading, login } = useAuth();
    if (isLoading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            className: "flex min-h-[60vh] items-center justify-center",
            "data-ocid": "profile.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
                ] })
        });
    }
    if (!isAuthenticated) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            className: "flex min-h-[60vh] items-center justify-center px-4",
            "data-ocid": "profile.unauthenticated_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-sm text-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-8 flex flex-col items-center gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-primary/10 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10 text-primary", "aria-hidden": "true" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Sign in required" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Please log in to view and edit your profile." })
                            ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                            type: "button",
                            className: "w-full",
                            onClick: login,
                            "data-ocid": "profile.login_button",
                            children: "Sign In with Email"
                        })
                    ] }) })
        });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-10",
        "data-ocid": "profile.page",
        children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-primary/10 p-3 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6 text-primary", "aria-hidden": "true" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground leading-tight", children: "My Profile" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your personal details and listings" })
                        ] })
                ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileForm, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MyListingsSection, {})
        ]
    });
}
export { ProfilePage as default };
