var express = require('express');
var router = express.Router();
var productDB  = require('../dbaccess/productDB');

// -------------- GET all customers --------------
router.get('/', function(req, res) {
    console.log('------ All customers ------');

    productDB.getProducts(function (err, data) {
        console.log("No of rows fetched: " + data.count);
        res.json(data.products);
//        res.render('customers', { title: 'Welcome to product page!', data: data.customers });
    });

});

// -------------- GET a product --------------
router.get('/:product_id', function(req, res) {
    console.log('------ a product ------');

    productDB.getProduct(req.params.product_id, function (err, product) {
        if (err) {
            console.log('No product found!');
            res.json({
                product: product
            });
        } else {
            res.json(product);
        }
    })
});

// -------------- POST a product --------------
router.post('/', function (req, res) {
    productDB.addProduct(req.body, function (err) {
        if (err) {
            console.log(req.body);
            console.log(err);
            res.json(false);
        } else
            res.json({ message: 'New product added!', data: req.body});
    });
});

// -------------- Update a product --------------
router.put('/:product_id', function (req, res) {
    productDB.updateProduct(req.params.product_id, req.body, function (err) {
        if (err) {
            console.log(err);
            res.json({ message: 'Product updated failed!', 'status': false });
        } else
            res.json({ message: 'Product updated successfully!', 'status': true });
    });
});

// -------------- Delete a product --------------
router.delete('/:product_id', function (req, res) {
    productDB.deleteProduct(req.params.product_id, function (err, product) {
        if (err) {
            console.log('Error in deleting product');
            res.json({ message: 'Product removed failed!', 'status': false });
        } else {
            res.json({ message: 'Product removed successfully!', 'status': true });
        }
    })
});

module.exports = router;
