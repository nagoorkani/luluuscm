var express = require('express');
var router = express.Router();

var OrderDB  = require('../dbaccess/orderDB');

// -------------- GET all Orders --------------
router.get('/', function(req, res) {
    console.log('------ All Orders ------');

    OrderDB.getOrders(function (err, data) {
        console.log("No of rows fetched: " + data.count);
        res.json(data.orders);
//        res.render('index', { title: 'Welcome to Order page!', data: data.orders });
    });

});

// -------------- GET a Order --------------
router.get('/:order_id', function(req, res) {
    console.log('------ a Order ------');

    OrderDB.getOrder(req.params.order_id, function (err, order) {
        if (err) {
            console.log('No Order found!');
            res.json({
                order: order
            });
        } else {
            res.json(order);
        }
    })
});

// -------------- POST a Order --------------
router.post('/', function (req, res) {
    OrderDB.addOrder(req.body, function (err) {
        if (err) {
            console.log(err);
            res.json(false);
        } else
            res.json({ message: 'New Order added!', data: req.body});
    });
});

// -------------- Update a Order --------------
router.put('/:order_id', function (req, res) {
    OrderDB.updateOrder(req.params.order_id, req.body, function (err) {
        if (err) {
            console.log(err);
            res.json({ message: 'Order updated failed!', 'status': false });
        } else
            res.json({ message: 'Order updated successfully!', 'status': true });
    });
});

// -------------- Delete a Order --------------
router.delete('/:order_id', function (req, res) {
    OrderDB.deleteOrder(req.params.order_id, function (err, order) {
        if (err) {
            console.log('Error in deleting Order');
            res.json({ message: 'Order removed failed!', 'status': false });
        } else {
            res.json({ message: 'Order removed successfully!', 'status': true });
        }
    })
});

module.exports = router;
