const joi=require('joi');

const listingSchema=joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        price : joi.number().required().min(0),
        location : joi.string().required(),
        country : joi.string().required(),
        image: joi.string().allow("",null),
    }).required(),
});


const reviewSchema=joi.object({
    review : joi.object({
        name : joi.string().required(),
        comment : joi.string().required(),
        rating : joi.number().required().min(1).max(5),
    }).required(),
});

module.exports = {listingSchema,reviewSchema};