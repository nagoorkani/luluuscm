var express = require('express');
var router = express.Router();

var customerDB  = require('../dbaccess/customerDB');

// -------------- GET all customers --------------
router.get('/', function(req, res) {
    console.log('------ All customers ------');

    customerDB.getCustomers(function (err, data) {
        console.log("No of rows fetched: " + data.count);
        res.json(data.customers);
//        res.render('customers', { title: 'Welcome to customer page!', data: data.customers });
    });

});

// -------------- GET a customer --------------
router.get('/:customer_id', function(req, res) {
    console.log('------ a customer ------');

    customerDB.getCustomer(req.params.customer_id, function (err, customer) {
        if (err) {
            console.log('No customer found!');
            res.json({
                customer: customer
            });
        } else {
            res.json(customer);
        }
    })
});

// -------------- POST a customer --------------
router.post('/', function (req, res) {
    customerDB.addCustomer(req.body, function (err) {
        if (err) {
            console.log(err);
            res.json(false);
        } else
            res.json({ message: 'New customer added!', data: req.body});
    });
});

// -------------- Update a customer --------------
router.put('/:customer_id', function (req, res) {
    customerDB.updateCustomer(req.params.customer_id, req.body, function (err) {
        if (err) {
            console.log(err);
            res.json({ message: 'Customer updated failed!', 'status': false });
        } else
            res.json({ message: 'Customer updated successfully!', 'status': true });
    });
});

// -------------- Delete a customer --------------
router.delete('/:customer_id', function (req, res) {
    customerDB.deleteCustomer(req.params.customer_id, function (err, customer) {
        if (err) {
            console.log('Error in deleting customer');
            res.json({ message: 'Customer removed failed!', 'status': false });
        } else {
            res.json({ message: 'Customer removed successfully!', 'status': true });
        }
    })
});

module.exports = router;
