import {MongoClient} from 'mongodb';
import {Database, User, Booking, Listing} from '../lib/types';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });
  const db = client.db('main');

  return {
    bookings: db.collection<Booking>('booking'),
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('user')
  }

}