const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the Items Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    restaurantId: {
        type: String,
        required: true
    },
    ingridients: {
        type: Array
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('items', ItemSchema); // exporting the model