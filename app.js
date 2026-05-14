const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require('./models/listing');
dotenv.config();

main()
.then(()=>{
  console.log('Connected to MongoDB');
}).catch(err=>{
  console.error('Failed to connect to MongoDB', err);
}) 

async function main() {
  await mongoose.connect(process.env.MONGO_URL)
}
app.get('/testListing',async (req, res)=>{
  let sampleListing = new Listing({
    title:'My new Villa', 
    description:'A beautiful villa with a pool and a garden',
    price: 500000,
    location: 'Goa Beach', 
    country: 'India'

  })
await sampleListing.save()
res.send('successfully added a new listing to the database')
})





app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log('Running on http://localhost:' + process.env.PORT);
})