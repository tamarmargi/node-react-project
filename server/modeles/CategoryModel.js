
const mongoose = require("mongoose")
const productSchema = require("./ProductSchema")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: {
        type: [productSchema],
        default: []
    }



}, {
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema)