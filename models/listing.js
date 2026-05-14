import mongoose from 'mongoose';

let listingSchema = new mongoose.Schema({
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
  default: 'https://tinyurl.com/5djccv34'
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
  }
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;