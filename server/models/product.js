/**
 * Created by z062281 on 6/17/14.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var ProductSchema = new Schema({
    productId:          { type: Number },
    title:              { type: String, required: true, trim: true },
    desc:               { type: String, required: true, trim: true, default: "description about product" },
    purchasedDate:      { type: Date, default: Date.now },
    unitPrice:          { type: Number, default: 0.00 },
    dealerPrice:        { type: Number, default: 0.00 },
    availableQty:       { type: Number, default: 0 },
    purchasedUnit:      { type: Number, default: 0 },
    purchasedQty:       { type: Number, default: 0 },
    discountsCash:      { type: Number, default: 0 },
    discountsOthers:    { type: Number, default: 0 },
    img:                { type: String }
});

ProductSchema.plugin(autoIncrement.plugin, {model: 'Product', field: 'productId', startAt: 6000, incrementBy: 1});
module.exports = mongoose.model('Product', ProductSchema);

// prod schema sample
//{
//    "$schema": "http://json-schema.org/draft-04/schema#",
//    "title": "Product set",
//    "type": "array",
//    "items": {
//    "title": "Product",
//        "type": "object",
//        "properties": {
//        "id": {
//            "description": "The unique identifier for a product",
//                "type": "number"
//        },
//        "name": {
//            "type": "string"
//        },
//        "price": {
//            "type": "number",
//                "minimum": 0,
//                "exclusiveMinimum": true
//        },
//        "tags": {
//            "type": "array",
//                "items": {
//                "type": "string"
//            },
//            "minItems": 1,
//                "uniqueItems": true
//        },
//        "dimensions": {
//            "type": "object",
//                "properties": {
//                "length": {"type": "number"},
//                "width": {"type": "number"},
//                "height": {"type": "number"}
//            },
//            "required": ["length", "width", "height"]
//        },
//        "warehouseLocation": {
//            "description": "Coordinates of the warehouse with the product",
//                "$ref": "http://json-schema.org/geo"
//        }
//    },
//    "required": ["id", "name", "price"]
//}
//}

//{
//    "name":"Product",
//    "properties":
//    {
//        "id":
//        {
//            "type":"number",
//            "description":"Product identifier",
//            "required":true
//        },
//        "name":
//        {
//            "description":"Name of the product",
//            "type":"string",
//            "required":true
//        },
//        "price":
//        {
//            "type":"number",
//            "minimum":0,
//            "required":true
//        },
//        "tags":
//        {
//            "type":"array",
//            "items":
//            {
//                "type":"string"
//            }
//        }
//    }
//}