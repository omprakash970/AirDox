import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from '../models/listing.js';
import data from './data.js'; 
dotenv.config({ path: '../.env' });

main()
  .then(() => {
    console.log('Connected to MongoDB');
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data.data);
  console.log('Database initialized with sample data');
};