const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema(
    {
        nameProuct: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        addressCreator: {
            type: String,
            required: true,
        },
        addressItem: {
            type: String,
            require: true,
        },
        addressBuyer: {
            type: String,
            require: true,
        },
        urlImage: {
            type: String,
            require: true,
        },
        date: {
            type: Date,
            default: Date.now(),
        }   
    },
)

module.exports = mongoose.model('Buyer', buyerSchema);