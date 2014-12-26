/**
 * Created by z062281 on 6/17/14.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

// Order items schema
var OrderItem = new Schema({
    productId:      { type: Schema.ObjectId, ref: 'ProductSchema' },
    orderId:        { type: Number, required: true, unique: true },
    title:          { type: String, trim: true },
    qty:            { type: Number, default: 1 },
    price:          { type: Number, default: "0.00" },
    discounts:      { type: Number, default: "0.00" }
});


var OrderSchema = new Schema({
    customerId: { type: Schema.ObjectId, ref: 'CustomerSchema' },
    date:       { type: Date, default: Date.now },
    items:      [OrderItem]
});


OrderSchema.plugin(autoIncrement.plugin, {model: 'Order', field: 'orderId', startAt: 1, incrementBy: 1});
module.exports = mongoose.model('Order', OrderSchema);