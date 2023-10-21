const mongoose=require('mongoose');
const data=require('./data.js');
const Listing=require('../models/listing.js');

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(`error occured:-${err}`);
    });

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    data.data=data.data.map((obj)=>({...obj,owner:"6533cc0bf4666e78e606f5a2"}));
    await Listing.insertMany(data.data);
    console.log("data inserted successfully");
};

initDB();
