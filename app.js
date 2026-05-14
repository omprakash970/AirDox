import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/listing.js';

const app = express();

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

main()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/testListing', async (req, res) => {

  let sampleListing = new Listing({
    title: 'Oppie Villa ',
    description: 'A will with sluts and bitches',
    image:'funck you',
    price: 20000,
    location: 'Texas',
    country: 'USA'
  });

  await sampleListing.save();

  res.send('Saved Successfully');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`Test the listing at http://localhost:${process.env.PORT}/testListing`);
});