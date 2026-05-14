import {mongo, mongoose} from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    set:(v)=>{
     v===''? "https://tinyurl.com/5djccv34":v
    }
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
});

const Listing = mongoose.model('Listing', listingSchema); 
module.exports = Listing;