import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as createSlot, g as cn, b as useNavigate, I as Input, d as Users, h as Label, B as Button, X, i as LoaderCircle, e as ue } from "./index-BXEpZzQv.js";
import { B as Badge } from "./badge-Bs8Yw0hg.js";
import { h as useCreateListing, A as ALL_CATEGORIES, b as Card, c as CardContent, d as CATEGORY_LABELS, M as MapPin, P as Phone, C as Category } from "./useBackend-BwHj800f.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-JzYBSjNp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M8 12h8", key: "1wcyev" }],
    ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
    ["path", { d: "M16 5h6", key: "1vod17" }],
    ["path", { d: "M19 2v6", key: "4bpg5p" }],
    ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$2);
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
            d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
            key: "vktsd0"
        }
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
    ["path", { d: "M12 4v16", key: "1654pz" }],
    ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
    ["path", { d: "M9 20h6", key: "s66wpe" }]
];
const Type = createLucideIcon("type", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
        const BaseContext = reactExports.createContext(defaultContext);
        BaseContext.displayName = rootComponentName + "Context";
        const index = defaultContexts.length;
        defaultContexts = [...defaultContexts, defaultContext];
        const Provider = (props) => {
            var _a;
            const { scope, children, ...context } = props;
            const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
            const value = reactExports.useMemo(() => context, Object.values(context));
            return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
        };
        Provider.displayName = rootComponentName + "Provider";
        function useContext2(consumerName, scope) {
            var _a;
            const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
            const context = reactExports.useContext(Context);
            if (context)
                return context;
            if (defaultContext !== void 0)
                return defaultContext;
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        return [Provider, useContext2];
    }
    const createScope = () => {
        const scopeContexts = defaultContexts.map((defaultContext) => {
            return reactExports.createContext(defaultContext);
        });
        return function useScope(scope) {
            const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
            return reactExports.useMemo(() => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }), [scope, contexts]);
        };
    };
    createScope.scopeName = scopeName;
    return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1)
        return baseScope;
    const createScope = () => {
        const scopeHooks = scopes.map((createScope2) => ({
            useScope: createScope2(),
            scopeName: createScope2.scopeName
        }));
        return function useComposedScopes(overrideScopes) {
            const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
                const scopeProps = useScope(overrideScopes);
                const currentScope = scopeProps[`__scope${scopeName}`];
                return { ...nextScopes2, ...currentScope };
            }, {});
            return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
        };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
}
var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
    const Slot = createSlot(`Primitive.${node}`);
    const Node = reactExports.forwardRef((props, forwardedRef) => {
        const { asChild, ...primitiveProps } = props;
        const Comp = asChild ? Slot : node;
        if (typeof window !== "undefined") {
            window[Symbol.for("radix-ui")] = true;
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
    });
    Node.displayName = `Primitive.${node}`;
    return { ...primitive, [node]: Node };
}, {});
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeProgress, value: valueProp = null, max: maxProp, getValueLabel = defaultGetValueLabel, ...progressProps } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
        console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
        console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, {
            "aria-valuemax": max,
            "aria-valuemin": 0,
            "aria-valuenow": isNumber(value) ? value : void 0,
            "aria-valuetext": valueLabel,
            role: "progressbar",
            "data-state": getProgressState(value, max),
            "data-value": value ?? void 0,
            "data-max": max,
            ...progressProps,
            ref: forwardedRef
        }) });
});
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
    });
});
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
    return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
    return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
    return typeof value === "number";
}
function isValidMaxNumber(max) {
    return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
    return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
    return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
    return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({ className, value, ...props }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, {
        "data-slot": "progress",
        className: cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className),
        ...props,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Indicator, {
            "data-slot": "progress-indicator",
            className: "bg-primary h-full w-full flex-1 transition-all",
            style: { transform: `translateX(-${100 - (value || 0)}%)` }
        })
    });
}
function Textarea({ className, ...props }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", {
        "data-slot": "textarea",
        className: cn("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ...props
    });
}
function isValidPhone(phone) {
    return /^[+]?[\d\s\-().]{7,20}$/.test(phone.trim());
}
function FieldWrapper({ id, label, required, error, errorId, icon: Icon, children }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "flex items-center gap-1.5 font-medium", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                    label,
                    required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
                ] }),
            children,
            error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                id: errorId,
                className: "text-xs text-destructive flex items-center gap-1",
                role: "alert",
                children: error
            })
        ] });
}
function PostListing() {
    const navigate = useNavigate();
    const { mutateAsync: createListing, isPending } = useCreateListing();
    const fileInputRef = reactExports.useRef(null);
    const [name, setName] = reactExports.useState("");
    const [description, setDescription] = reactExports.useState("");
    const [category, setCategory] = reactExports.useState(ALL_CATEGORIES[0]);
    const [location, setLocation] = reactExports.useState("");
    const [contactPhone, setContactPhone] = reactExports.useState("");
    const [images, setImages] = reactExports.useState([]);
    const [errors, setErrors] = reactExports.useState({});
    const [isUploadingAny, setIsUploadingAny] = reactExports.useState(false);
    const [roommatesNeeded, setRoommatesNeeded] = reactExports.useState("1");
    const [currentRoommates, setCurrentRoommates] = reactExports.useState([]);
    const isRoommateFinder = category === Category.roommate_finder;
    const nameLabel = isRoommateFinder ? "Headline" : "Listing Name";
    const descLabel = isRoommateFinder ? "Details & Requirements" : "Description";
    function validate() {
        const e = {};
        if (!name.trim())
            e.name = "Listing name is required";
        if (!description.trim())
            e.description = "Description is required";
        if (!location.trim())
            e.location = "Location is required";
        if (!contactPhone.trim()) {
            e.contactPhone = "Contact phone is required";
        }
        else if (!isValidPhone(contactPhone)) {
            e.contactPhone = "Enter a valid phone number (e.g. +880 1XXX-XXXXXX)";
        }
        if (isRoommateFinder) {
            currentRoommates.forEach((rm, i) => {
                if (!rm.name.trim())
                    e[`rm_name_${i}`] = "Name is required";
                if (!rm.description.trim())
                    e[`rm_desc_${i}`] = "Description is required";
                if (!rm.photoData)
                    e[`rm_photo_${i}`] = "Photo is required";
            });
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    }
    function clearFieldError(field) {
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }
    async function handleFilesSelected(files) {
        if (!files || files.length === 0)
            return;
        const newFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
        if (newFiles.length === 0) {
            ue.error("Please select valid image files (JPG, PNG, WebP, etc.)");
            return;
        }
        setIsUploadingAny(true);
        const timestamp = Date.now();
        const newImages = newFiles.map((file, idx) => ({
            id: `${file.name}-${timestamp}-${idx}`,
            file,
            previewUrl: URL.createObjectURL(file),
            progress: 0,
            status: "uploading",
            imageKey: ""
        }));
        setImages((prev) => [...prev, ...newImages]);
        const updatedImages = await Promise.all(newImages.map(async (img) => {
            try {
                await new Promise((resolve) => {
                    let pct = 0;
                    const interval = setInterval(() => {
                        pct += Math.random() * 30 + 10;
                        if (pct >= 100) {
                            pct = 100;
                            clearInterval(interval);
                            resolve();
                        }
                        setImages((prev) => prev.map((i) => i.id === img.id ? { ...i, progress: Math.min(pct, 100) } : i));
                    }, 120);
                });
                const imageKey = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(img.file);
                });
                setImages((prev) => prev.map((i) => i.id === img.id ? { ...i, status: "done", progress: 100, imageKey } : i));
                return { ...img, status: "done", progress: 100, imageKey };
            }
            catch {
                setImages((prev) => prev.map((i) => i.id === img.id ? { ...i, status: "error", progress: 0 } : i));
                return { ...img, status: "error" };
            }
        }));
        if (updatedImages.some((i) => i.status === "error")) {
            ue.error("Some images failed to process. Please try again.");
        }
        setIsUploadingAny(false);
    }
    function removeImage(id) {
        setImages((prev) => {
            const img = prev.find((i) => i.id === id);
            if (img)
                URL.revokeObjectURL(img.previewUrl);
            return prev.filter((i) => i.id !== id);
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate())
            return;
        if (isUploadingAny) {
            ue.error("Please wait for images to finish uploading.");
            return;
        }
        const doneImageKeys = images.filter((i) => i.status === "done").map((i) => i.imageKey);
        let metadataObj = null;
        if (isRoommateFinder) {
            metadataObj = {
                roommatesNeeded: parseInt(roommatesNeeded) || 1,
                roommatesGot: currentRoommates.length,
                currentRoommates: currentRoommates.map((rm) => ({
                    name: rm.name.trim(),
                    description: rm.description.trim(),
                    photoData: rm.photoData
                }))
            };
        }
        try {
            const listing = await createListing({
                name: name.trim(),
                description: description.trim(),
                category,
                location: location.trim(),
                contactPhone: contactPhone.trim(),
                imageKeys: doneImageKeys,
                metadata: metadataObj ? JSON.stringify(metadataObj) : null
            });
            ue.success("Listing posted successfully!");
            navigate({ to: "/listings/$id", params: { id: listing.id.toString() } });
        }
        catch {
            ue.error("Failed to post listing. Please try again.");
        }
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "post_listing.page", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 sm:px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-2xl", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "Post a Listing" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Share your property or service with thousands of potential clients." })
                    ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 py-8 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", {
                            onSubmit: handleSubmit,
                            noValidate: true,
                            className: "flex flex-col gap-7",
                            children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldWrapper, {
                                    id: "listing-category",
                                    label: "Category",
                                    required: true,
                                    icon: Tag,
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, {
                                        value: category,
                                        onValueChange: (v) => setCategory(v),
                                        children: [
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, {
                                                id: "listing-category",
                                                "data-ocid": "post_listing.category.select",
                                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" })
                                            }),
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: CATEGORY_LABELS[cat] }, cat)) })
                                        ]
                                    })
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldWrapper, {
                                    id: "listing-name",
                                    label: nameLabel,
                                    required: true,
                                    error: errors.name,
                                    errorId: "name-error",
                                    icon: Type,
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                        id: "listing-name",
                                        placeholder: "e.g. Spacious 2-bedroom flat in Gulshan",
                                        value: name,
                                        onChange: (e) => {
                                            setName(e.target.value);
                                            if (errors.name)
                                                clearFieldError("name");
                                        },
                                        onBlur: () => !name.trim() && setErrors((er) => ({
                                            ...er,
                                            name: "Listing name is required"
                                        })),
                                        "aria-invalid": !!errors.name,
                                        "aria-describedby": errors.name ? "name-error" : void 0,
                                        "data-ocid": "post_listing.name.input"
                                    })
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldWrapper, {
                                    id: "listing-location",
                                    label: "Location",
                                    required: true,
                                    error: errors.location,
                                    errorId: "location-error",
                                    icon: MapPin,
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                        id: "listing-location",
                                        placeholder: "e.g. Gulshan-2, Dhaka",
                                        value: location,
                                        onChange: (e) => {
                                            setLocation(e.target.value);
                                            if (errors.location)
                                                clearFieldError("location");
                                        },
                                        onBlur: () => !location.trim() && setErrors((er) => ({
                                            ...er,
                                            location: "Location is required"
                                        })),
                                        "aria-invalid": !!errors.location,
                                        "aria-describedby": errors.location ? "location-error" : void 0,
                                        "data-ocid": "post_listing.location.input"
                                    })
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldWrapper, {
                                    id: "listing-description",
                                    label: descLabel,
                                    required: true,
                                    error: errors.description,
                                    errorId: "desc-error",
                                    icon: Type,
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, {
                                        id: "listing-description",
                                        placeholder: "Describe your property — size, amenities, special features, nearby landmarks…",
                                        rows: 5,
                                        value: description,
                                        onChange: (e) => {
                                            setDescription(e.target.value);
                                            if (errors.description)
                                                clearFieldError("description");
                                        },
                                        onBlur: () => !description.trim() && setErrors((er) => ({
                                            ...er,
                                            description: "Description is required"
                                        })),
                                        "aria-invalid": !!errors.description,
                                        "aria-describedby": errors.description ? "desc-error" : void 0,
                                        "data-ocid": "post_listing.description.textarea",
                                        className: "resize-y"
                                    })
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldWrapper, {
                                    id: "listing-phone",
                                    label: "Contact Phone",
                                    required: true,
                                    error: errors.contactPhone,
                                    errorId: "phone-error",
                                    icon: Phone,
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                        id: "listing-phone",
                                        type: "tel",
                                        placeholder: "+880 1XXX-XXXXXX",
                                        value: contactPhone,
                                        onChange: (e) => {
                                            setContactPhone(e.target.value);
                                            if (errors.contactPhone)
                                                clearFieldError("contactPhone");
                                        },
                                        onBlur: () => {
                                            if (!contactPhone.trim()) {
                                                setErrors((er) => ({
                                                    ...er,
                                                    contactPhone: "Contact phone is required"
                                                }));
                                            }
                                            else if (!isValidPhone(contactPhone)) {
                                                setErrors((er) => ({
                                                    ...er,
                                                    contactPhone: "Enter a valid phone number (e.g. +880 1XXX-XXXXXX)"
                                                }));
                                            }
                                        },
                                        "aria-invalid": !!errors.contactPhone,
                                        "aria-describedby": errors.contactPhone ? "phone-error" : void 0,
                                        "data-ocid": "post_listing.contact_phone.input"
                                    })
                                }),
                                isRoommateFinder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t border-border pt-6 mt-2", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: "Roommate Information" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldWrapper, {
                                            id: "roommates-needed",
                                            label: "How many roommates are you looking for?",
                                            required: true,
                                            icon: Users,
                                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                                id: "roommates-needed",
                                                type: "number",
                                                min: "1",
                                                value: roommatesNeeded,
                                                onChange: (e) => setRoommatesNeeded(e.target.value)
                                            })
                                        }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-4", children: [
                                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                                                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 font-medium", children: [
                                                                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                                                                "Current Roommates Details"
                                                            ] }),
                                                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                                                            type: "button",
                                                            variant: "outline",
                                                            size: "sm",
                                                            onClick: () => setCurrentRoommates((prev) => [
                                                                ...prev,
                                                                { id: Math.random().toString(), name: "", description: "", photoData: "" }
                                                            ]),
                                                            children: [
                                                                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-1.5" }),
                                                                "Add Roommate"
                                                            ]
                                                        })
                                                    ] }),
                                                currentRoommates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg text-center border border-dashed border-border", children: 'No current roommates added. Click "Add Roommate" if you already have people living there to add their picture and description.' }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: currentRoommates.map((rm, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative border border-border shadow-sm", children: [
                                                            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                                                type: "button",
                                                                variant: "ghost",
                                                                size: "icon",
                                                                className: "absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-destructive",
                                                                onClick: () => setCurrentRoommates((prev) => prev.filter((_, i) => i !== idx)),
                                                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                                                            }),
                                                            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 pt-8 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5", children: [
                                                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4", children: [
                                                                                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldWrapper, {
                                                                                    id: `rm-name-${idx}`,
                                                                                    label: `Roommate ${idx + 1} Name`,
                                                                                    required: true,
                                                                                    error: errors[`rm_name_${idx}`],
                                                                                    icon: Type,
                                                                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                                                                                        id: `rm-name-${idx}`,
                                                                                        placeholder: "e.g. John Doe",
                                                                                        value: rm.name,
                                                                                        onChange: (e) => {
                                                                                            const val = e.target.value;
                                                                                            setCurrentRoommates((prev) => {
                                                                                                const next = [...prev];
                                                                                                next[idx].name = val;
                                                                                                return next;
                                                                                            });
                                                                                            if (errors[`rm_name_${idx}`])
                                                                                                clearFieldError(`rm_name_${idx}`);
                                                                                        }
                                                                                    })
                                                                                }),
                                                                                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldWrapper, {
                                                                                    id: `rm-desc-${idx}`,
                                                                                    label: "Description & Habits",
                                                                                    required: true,
                                                                                    error: errors[`rm_desc_${idx}`],
                                                                                    icon: Type,
                                                                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, {
                                                                                        id: `rm-desc-${idx}`,
                                                                                        placeholder: "e.g. Student, early bird, loves reading...",
                                                                                        value: rm.description,
                                                                                        onChange: (e) => {
                                                                                            const val = e.target.value;
                                                                                            setCurrentRoommates((prev) => {
                                                                                                const next = [...prev];
                                                                                                next[idx].description = val;
                                                                                                return next;
                                                                                            });
                                                                                            if (errors[`rm_desc_${idx}`])
                                                                                                clearFieldError(`rm_desc_${idx}`);
                                                                                        },
                                                                                        rows: 2,
                                                                                        className: "resize-none"
                                                                                    })
                                                                                })
                                                                            ] }),
                                                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-32 flex flex-col gap-2", children: [
                                                                                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium", children: [
                                                                                        "Photo ",
                                                                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                                                                                    ] }),
                                                                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-square rounded-md border-2 border-dashed border-border overflow-hidden bg-muted flex items-center justify-center group", children: rm.photoData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                                                                            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: rm.photoData, alt: `Roommate ${idx + 1}`, className: "w-full h-full object-cover" }),
                                                                                            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity", children: [
                                                                                                    /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6 text-white" }),
                                                                                                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
                                                                                                        type: "file",
                                                                                                        accept: "image/*",
                                                                                                        className: "sr-only",
                                                                                                        onChange: (e) => {
                                                                                                            var _a;
                                                                                                            if ((_a = e.target.files) == null ? void 0 : _a[0]) {
                                                                                                                const reader = new FileReader();
                                                                                                                reader.onload = () => {
                                                                                                                    const dataUrl = reader.result;
                                                                                                                    setCurrentRoommates((prev) => {
                                                                                                                        const next = [...prev];
                                                                                                                        next[idx].photoData = dataUrl;
                                                                                                                        return next;
                                                                                                                    });
                                                                                                                    if (errors[`rm_photo_${idx}`])
                                                                                                                        clearFieldError(`rm_photo_${idx}`);
                                                                                                                };
                                                                                                                reader.readAsDataURL(e.target.files[0]);
                                                                                                            }
                                                                                                        }
                                                                                                    })
                                                                                                ] })
                                                                                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors", children: [
                                                                                            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6 text-muted-foreground mb-1" }),
                                                                                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Upload" }),
                                                                                            /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
                                                                                                type: "file",
                                                                                                accept: "image/*",
                                                                                                className: "sr-only",
                                                                                                onChange: (e) => {
                                                                                                    var _a;
                                                                                                    if ((_a = e.target.files) == null ? void 0 : _a[0]) {
                                                                                                        const reader = new FileReader();
                                                                                                        reader.onload = () => {
                                                                                                            const dataUrl = reader.result;
                                                                                                            setCurrentRoommates((prev) => {
                                                                                                                const next = [...prev];
                                                                                                                next[idx].photoData = dataUrl;
                                                                                                                return next;
                                                                                                            });
                                                                                                            if (errors[`rm_photo_${idx}`])
                                                                                                                clearFieldError(`rm_photo_${idx}`);
                                                                                                        };
                                                                                                        reader.readAsDataURL(e.target.files[0]);
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        ] }) }),
                                                                                errors[`rm_photo_${idx}`] && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-destructive", children: errors[`rm_photo_${idx}`] })
                                                                            ] })
                                                                    ] }) })
                                                        ] }, rm.id)) })
                                            ] })
                                    ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                                                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 font-medium", children: [
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                                                        "Photos",
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs ml-1", children: "(optional)" })
                                                    ] }),
                                                images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                                                        images.filter((i) => i.status === "done").length,
                                                        " of",
                                                        " ",
                                                        images.length,
                                                        " ready"
                                                    ] })
                                            ] }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", {
                                            type: "button",
                                            onClick: () => {
                                                var _a;
                                                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                                            },
                                            className: "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-smooth hover:border-primary/50 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            "aria-label": "Select images to upload",
                                            "data-ocid": "post_listing.image_upload.dropzone",
                                            children: [
                                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6" }) }),
                                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Click to add photos" }),
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "JPG, PNG, WebP up to 10MB each — multiple files OK" })
                                                    ] }),
                                                /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
                                                    ref: fileInputRef,
                                                    type: "file",
                                                    accept: "image/*",
                                                    multiple: true,
                                                    className: "sr-only",
                                                    onChange: (e) => handleFilesSelected(e.target.files),
                                                    "data-ocid": "post_listing.image_file.input"
                                                })
                                            ]
                                        }),
                                        images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
                                            "data-ocid": "post_listing.images.list",
                                            children: [
                                                images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                                                    className: "relative group rounded-lg overflow-hidden border border-border bg-muted aspect-square",
                                                    "data-ocid": `post_listing.image.item.${i + 1}`,
                                                    children: [
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
                                                            src: img.previewUrl,
                                                            alt: `Upload preview ${i + 1}`,
                                                            className: "h-full w-full object-cover"
                                                        }),
                                                        img.status === "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-background/80 gap-2 px-3", children: [
                                                                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 text-primary animate-spin" }),
                                                                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, {
                                                                    value: img.progress,
                                                                    className: "h-1.5 w-full"
                                                                }),
                                                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                                                                        Math.round(img.progress),
                                                                        "%"
                                                                    ] })
                                                            ] }),
                                                        img.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1.5 left-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-accent drop-shadow-sm" }) }),
                                                        img.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, {
                                                                variant: "destructive",
                                                                className: "text-xs px-1.5 py-0.5",
                                                                children: "Failed"
                                                            }) }),
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
                                                            type: "button",
                                                            onClick: () => removeImage(img.id),
                                                            "aria-label": `Remove image ${i + 1}`,
                                                            className: "absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-foreground shadow opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-smooth hover:bg-destructive hover:text-destructive-foreground",
                                                            "data-ocid": `post_listing.remove_image.delete_button.${i + 1}`,
                                                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                                                        })
                                                    ]
                                                }, img.id)),
                                                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", {
                                                    type: "button",
                                                    onClick: () => {
                                                        var _a;
                                                        return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                                                    },
                                                    className: "flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border bg-muted/20 aspect-square text-muted-foreground transition-smooth hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                    "aria-label": "Add more images",
                                                    "data-ocid": "post_listing.add_more_images.button",
                                                    children: [
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-5 w-5" }),
                                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Add more" })
                                                    ]
                                                })
                                            ]
                                        })
                                    ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                            type: "submit",
                                            disabled: isPending || isUploadingAny,
                                            size: "lg",
                                            className: "w-full gap-2",
                                            "data-ocid": "post_listing.submit.submit_button",
                                            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
                                                    "Posting…"
                                                ] }) : isUploadingAny ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
                                                    "Uploading images…"
                                                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                                    /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-5 w-5" }),
                                                    "Post Listing"
                                                ] })
                                        }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center mt-3", children: [
                                                "Fields marked with",
                                                " ",
                                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-semibold", children: "*" }),
                                                " are required. Your listing goes live immediately."
                                            ] })
                                    ] })
                            ]
                        }) }) }) })
        ] });
}
export { PostListing as default };
