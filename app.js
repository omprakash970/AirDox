import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/listing.js';
import ejs from 'ejs';

import ejsMate from 'ejs-mate'; 

import methodOverride from 'method-override';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.use(express.static(path.join(path.resolve(), 'public')));
app.set('views', path.join(path.resolve(), 'views'));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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
});

app.get("/listings", async (req, res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});

});

app.get("/listings/new", (req, res)=>{
  res.render("listings/new.ejs");
});

app.get("/listings/:id", async (req, res)=>{
  let {id}= req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
});

app.post("/listings", async (req, res)=>{
  let listing = req.body.listing;
  await Listing.create(listing);
  res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
});

app.put("/listings/:id", async (req, res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});
app.delete("/listings/:id", async (req, res)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});


app.get('/api/health', (req, res) => {
  res.json({
    status: '✨ AirDox is breathing',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB'
  });
});







app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`Test the listing at http://localhost:${process.env.PORT}/`);
});