const mongoose = require("mongoose")

const busketSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    products: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'productSchema',
            },
            toppings: {
                type: {
                },
            },
            amount: {
                type: Number,
                default: 0
            }
        }],
        default: []
    },
    TotalPayable: {
        type: Number,
        default: 0.00
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('busket', busketSchema) 