import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/listing.js';
import ejs from 'ejs';


const app = express();

app.set('view engine', 'ejs');
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
app.get('/', (req, res)=>{
    res.send("Server is running, don't worry about it");
})

app.get("/listings",async (req, res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});

})



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`Test the listing at http://localhost:${process.env.PORT}/`);
});