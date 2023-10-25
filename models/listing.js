const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description: {
        type: String,
    },
    image: {
        // type: String,
        // default:"https://images.unsplash.com/photo-1694846119962-491ac7bcc568?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
        // set:(v)=>v===""?"https://images.unsplash.com/photo-1694846119962-491ac7bcc568?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80":v,
        
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'review'
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref:'user'
    }
});

const listing=mongoose.model("listing",listingSchema);

module.exports=listing;