const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log('Running on http://localhost:' + process.env.PORT);
})