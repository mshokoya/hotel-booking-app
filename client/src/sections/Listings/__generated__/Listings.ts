/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Listings
// ====================================================

export interface Listings_listings {
  __typename: "Listing";
  id: string;
  title: string;
  address: string;
  image: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  rating: number;
}

export interface Listings {
  listings: Listings_listings[];
}
