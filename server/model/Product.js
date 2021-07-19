const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// export model user with UserSchema
module.exports = mongoose.model("product", ProductSchema);