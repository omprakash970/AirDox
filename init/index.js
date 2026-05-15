import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from '../models/listing.js';
import data from './data.js';

// Load environment variables
dotenv.config();

// MongoDB Connection
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// Initialize Database
const initDB = async () => {
  try {
    await Listing.deleteMany({});

    await Listing.insertMany(data.data);

    console.log('✅ Database initialized with sample data');

    process.exit();
  } catch (err) {
    console.log('❌ Error initializing DB:', err);
  }
};

// Connect and Run
main()
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');

    initDB();
  })
  .catch((err) => {
    console.log('❌ MongoDB Connection Error:', err);
  });