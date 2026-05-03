import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpsertProfileInput {
    name: string;
    email: string;
    address: string;
    phone: string;
}
export type UserId = Principal;
export type Timestamp = bigint;
export interface ListingPublic {
    id: ListingId;
    imageKeys: Array<string>;
    owner: UserId;
    name: string;
    createdAt: Timestamp;
    description: string;
    category: Category;
    location: string;
    contactPhone: string;
}
export type ListingId = bigint;
export interface CreateListingInput {
    imageKeys: Array<string>;
    name: string;
    description: string;
    category: Category;
    location: string;
    contactPhone: string;
}
export interface BrowseFilter {
    locationQuery?: string;
    category?: Category;
}
export interface UserProfilePublic {
    id: UserId;
    name: string;
    email: string;
    address: string;
    phone: string;
}
export interface UpdateListingInput {
    imageKeys: Array<string>;
    name: string;
    description: string;
    location: string;
    contactPhone: string;
}
export enum Category {
    shifting_service = "shifting_service",
    hotel = "hotel",
    house = "house",
    flat = "flat",
    convention_hall = "convention_hall"
}
export interface backendInterface {
    browseListings(filter: BrowseFilter): Promise<Array<ListingPublic>>;
    createListing(input: CreateListingInput): Promise<ListingPublic>;
    deleteListing(id: ListingId): Promise<boolean>;
    getListing(id: ListingId): Promise<ListingPublic | null>;
    getMyListings(): Promise<Array<ListingPublic>>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    updateListing(id: ListingId, input: UpdateListingInput): Promise<ListingPublic | null>;
    upsertMyProfile(input: UpsertProfileInput): Promise<UserProfilePublic>;
}
