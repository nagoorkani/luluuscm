/**
 * Created by z062281 on 6/18/14.
 */

var Order = require('../models/order');

module.exports = {

    // -------------- Get all the Order --------------
    getOrders: function (callback) {
        console.log("~~~~~ getOrders ~~~~~");

        var count = 0;
        Order.find({}, { '_id': 0, 'orderDate': 1, 'customerId': 1, 'email': 1, 'items': [] },
            function (err, orders) {
                count = orders.length;
            })
            .exec(function (err, orders) {
                callback(null, {
                    count: count,
                    orders: orders
                });
            });
    },

    // -------------- Get an Order --------------
    getOrder: function (id, callback) {
        console.log("~~~~~ getOrder ~~~~~");
        Order.find({ '_id': id }, {}, function (err, order) {
            console.log(order);
            callback(null, order);
        });
    },

    // -------------- Add new Order --------------
    addOrder: function (req_body, callback) {
        console.log("~~~~~ addOrder ~~~~~");

        var order = new Order();

        order.id            = req_body.id;
        order.orderDate     = req_body.orderDate;
        order.customerId    = req_body.customerId;
        order.items         = req_body.items;

        order.save(function (err, order) {
            if (err) {
                console.log("Error adding new order: " + err);
                return callback(err);
            }
            console.log(order);
            callback (null, order);
        });
    },

    // -------------- Update an Order --------------
    updateOrder: function (id, req_body, callback) {
        console.log("~~~~~ updateOrder ~~~~~");

//        Order.findOne({ '_id': id}, { '_id': 1, 'name': 1}, function (err, order) {
//            if (err) return callback(err);
//
//            order.id            = req_body.id || order.id;
//            order.orderDate     = req_body.orderDate || order.name;
//            order.customerId    = req_body.customerId || order.business;
////            order.items         = getOrderItems(req_body.items, order.items);
//
//            var orderID = req_body.items.id;
//            order.items.id(orderID).push()
//
//            order.save(function (err) {
//                if (err) { console.log('Error in updating Order'); return callback(err); }
//
//                callback(null);
//            })
//        });

        Order.findByIdAndUpdate(req_body._id, {
            orderDate: req_body.orderDate,
            customerId: req_body.customerId,
            items: req_body.items
        }, function(err, order) {
            if (err) {
                console.log("error updating filings: " + err);
            }
            console.log('Order is: ' + order);
            callback(null);
        });
    },

    // -------------- Delete an Order --------------
    deleteOrder: function (id, callback) {
        console.log("~~~~~ deleteOrder ~~~~~");

        Order.remove({ '_id': id }, function (err, order) {
            callback(null);
        })
    }

};

