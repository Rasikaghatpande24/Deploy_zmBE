const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the Restaurant Schema
const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    thumb: {
        type: Array
    },
    aggregate_rating: {
        type: Number,
        required: true
    },
    rating_text: {
        type: String,
        required: true
    },
    min_price: {
        type: Number,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    type: {
        type: Array
    },
    cuisine: {
        type: Array
    },
    restId: {
        type: String,
        required: true
    }
})

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.Restaurant || mongoose.model('restaurants', RestaurantSchema);