import {Collection, ObjectId} from 'mongodb';

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}

export interface BookingIndexMonth {
  [key:string] : boolean
}

export interface BookingIndexYear {
  [key:string] : BookingIndexMonth;
}

export interface BookingsIndex {
  [key: string]: BookingIndexYear;
}

export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE"
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndex;
  price: number;
  numOfGuests: number;
  authorized?: boolean;
}

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact:string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
  authorized?: boolean;
}

export interface Booking {
  _id: ObjectId;
  listing: ObjectId;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
  bookings: Collection<Booking>
}
