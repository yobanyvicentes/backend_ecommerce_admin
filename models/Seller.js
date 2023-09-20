const { Schema, model } = require("mongoose");

const SellerSchema = Schema({
    internalId: {type: String, required: true, unique: true,},
    name: {type: String, required: true, minlength: 6},
    description: {type: String, required: true, minlength: 6},
    createDate: {type: Date, required: true,},
    updateDate: {type: Date, required: true,},
});

module.exports = model('Seller', SellerSchema);

