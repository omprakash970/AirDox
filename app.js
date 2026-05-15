import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/listing.js';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import path from 'path';

const app = express();

// Load environment variables
dotenv.config();
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.set('views', path.join(path.resolve(), 'views'));

app.use(express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.log('❌ MongoDB Connection Error:', err);
  });

// Home Route
app.get('/', (req, res) => {
  res.send("🚀 Server is running successfully");
});

// INDEX Route
app.get('/listings', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index.ejs', { allListings });
});

// NEW Route
app.get('/listings/new', (req, res) => {
  res.render('listings/new.ejs');
});

// SHOW Route
app.get('/listings/:id', async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  res.render('listings/show.ejs', { listing });
});

// CREATE Route
app.post('/listings', async (req, res) => {
  try{
      const listing = req.body.listing;
  await Listing.create(listing);
  res.redirect('/listings');
  }catch(err){
    next(err); 
  }

});

// EDIT Route
app.get('/listings/:id/edit', async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  res.render('listings/edit.ejs', { listing });
});

// UPDATE Route
app.put('/listings/:id', async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndUpdate(id, {
    ...req.body.listing
  });

  res.redirect(`/listings/${id}`);
});

// DELETE Route
app.delete('/listings/:id', async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  res.redirect('/listings');
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: '✨ AirDox is breathing',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    memory:
      Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB'
  });
});


const PORT = process.env.PORT || 3000;

app.use((err, req, res, next)=>{
  res.send('❌ Oops! Something went wrong. Please try again later.');
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Open: http://localhost:${PORT}`);
});