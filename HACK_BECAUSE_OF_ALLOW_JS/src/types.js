export var Category;
(function (Category) {
    Category["shifting_service"] = "shifting_service";
    Category["hotel"] = "hotel";
    Category["house"] = "house";
    Category["flat"] = "flat";
    Category["convention_hall"] = "convention_hall";
    Category["marketplace"] = "marketplace";
    Category["event_planning"] = "event_planning";
    Category["decoration_service"] = "decoration_service";
    Category["maintenance_service"] = "maintenance_service";
    Category["cleaning_service"] = "cleaning_service";
    Category["catering_service"] = "catering_service";
    Category["roommate_finder"] = "roommate_finder";
})(Category || (Category = {}));
export const BROWSE_CATEGORIES = [
    Category.flat,
    Category.hotel,
    Category.house,
    Category.convention_hall,
];
export const ALL_CATEGORIES = [
    Category.flat,
    Category.hotel,
    Category.house,
    Category.convention_hall,
    Category.shifting_service,
    Category.marketplace,
    Category.event_planning,
    Category.decoration_service,
    Category.maintenance_service,
    Category.cleaning_service,
    Category.catering_service,
    Category.roommate_finder,
];
export const SERVICE_CATEGORIES = [
    Category.shifting_service,
    Category.event_planning,
    Category.decoration_service,
    Category.maintenance_service,
    Category.cleaning_service,
    Category.catering_service,
];
export const CATEGORY_LABELS = {
    [Category.flat]: "Flat",
    [Category.hotel]: "Hotel",
    [Category.house]: "House",
    [Category.convention_hall]: "Convention Hall",
    [Category.shifting_service]: "Shifting Service",
    [Category.marketplace]: "Marketplace",
    [Category.event_planning]: "Event Planning",
    [Category.decoration_service]: "Decoration Service",
    [Category.maintenance_service]: "Maintenance Service",
    [Category.cleaning_service]: "Cleaning Service",
    [Category.catering_service]: "Catering Service",
    [Category.roommate_finder]: "Roommate Finder",
};
export const CATEGORY_COLORS = {
    [Category.flat]: "bg-blue-100 text-blue-800",
    [Category.hotel]: "bg-purple-100 text-purple-800",
    [Category.house]: "bg-green-100 text-green-800",
    [Category.convention_hall]: "bg-amber-100 text-amber-800",
    [Category.shifting_service]: "bg-rose-100 text-rose-800",
    [Category.marketplace]: "bg-orange-100 text-orange-800",
    [Category.event_planning]: "bg-pink-100 text-pink-800",
    [Category.decoration_service]: "bg-fuchsia-100 text-fuchsia-800",
    [Category.maintenance_service]: "bg-teal-100 text-teal-800",
    [Category.cleaning_service]: "bg-cyan-100 text-cyan-800",
    [Category.catering_service]: "bg-yellow-100 text-yellow-800",
    [Category.roommate_finder]: "bg-indigo-100 text-indigo-800",
};
