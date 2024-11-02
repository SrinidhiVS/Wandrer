const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/Listing.js');

const MONGO_URL = "mongodb://localhost:27017/wandrer";

main()
.then(() => {
    console.log('Connected to database');
})
.catch(err => {
    console.error('Error connecting to database', err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB= async () => {
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"670ab20bfee4a4b5d35902da"}));
    await Listing.insertMany(initdata.data);
    console.log("Database initialized");
}

initDB();