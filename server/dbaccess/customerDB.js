/**
 * Created by z062281 on 6/18/14.
 */

var Customer = require('../models/customer');

module.exports = {

    // -------------- Get all the customer --------------
    getCustomers: function (callback) {
        console.log("~~~~~ getCustomers ~~~~~");

        var count = 0;
        Customer.find({}, { 'customerId': 1, 'name': 1, 'business': 1, 'email': 1, 'address': 1, 'city': 1, 'zip': 1, 'state': 1 },
            function (err, customers) {
                count = customers.length;
            })
            .exec(function (err, customers) {
                callback(null, {
                    count: count,
                    customers: customers
                });
            });
    },

    // -------------- Get a customer --------------
    getCustomer: function (id, callback) {
        console.log("~~~~~ getCustomer ~~~~~");
        Customer.find({ 'customerId': id }, {}, function (err, customer) {
            console.log(customer);
            callback(null, customer);
        });
    },

    // -------------- Add new customer --------------
    addCustomer: function (req_body, callback) {
        console.log("~~~~~ addCustomer ~~~~~");

        var customer = new Customer();
        //customer.customerId = 1;      // auto generated
        customer.name       = req_body.name;
        customer.business   = req_body.business;
        customer.email      = req_body.email;
        customer.address    = req_body.address;
        customer.city       = req_body.city;
        customer.zip        = req_body.zip;
        customer.state      = req_body.state;

        customer.save(function (err, customer) {
            if (err) {
                console.log("Error adding new customer: " + err);
                return callback(err);
            }
            console.log(customer);
            callback (null, customer);
        });
    },

    // -------------- Update a customer --------------
    updateCustomer: function (id, req_body, callback) {
        console.log("~~~~~ updateCustomer ~~~~~");

        Customer.findOne({ 'id': id}, { 'id': 1, 'name': 1}, function (err, customer) {
            if (err) return callback(err);

            customer.customerId = req_body.id || customer.id;
            customer.name       = req_body.name || customer.name;
            customer.business   = req_body.business || customer.business;
            customer.email      = req_body.email || customer.email;
            customer.address    = req_body.address || customer.address;
            customer.city       = req_body.city || customer.city;
            customer.zip        = req_body.zip || customer.zip;
            customer.state      = req_body.state || customer.state;


            customer.save(function (err) {
                if (err) { console.log('Error in updating customer'); return callback(err); }

                callback(null);
            })
        });
    },

    // -------------- Delete a customer --------------
    deleteCustomer: function (id, callback) {
        console.log("~~~~~ deleteCustomer ~~~~~");

        Customer.remove({ 'id': id }, function (err, customer) {
            callback(null);
        })
    }

}