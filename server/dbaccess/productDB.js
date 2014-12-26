/**
 * Created by z062281 on 6/18/14.
 */

var Product = require('../models/product');

module.exports = {

    // -------------- Get all the product --------------
    getProducts: function (callback) {
        console.log("~~~~~ getproducts ~~~~~");


        var count = 0;
        Product.find({}, { 'productId': 1, 'title': 1, 'desc': 1, 'date': 1, 'price': 1, 'availableQty': 1 },
            function (err, products) {
                count = products.length;
            })
            .exec(function (err, products) {
                callback(null, {
                    count: count,
                    products: products
                });
            });
    },

    // -------------- Get a product --------------
    getProduct: function (id, callback) {
        console.log("~~~~~ getproduct ~~~~~");
        Product.find({ 'productId': id }, {}, function (err, product) {
            console.log(product);
            callback(null, product);
        });
    },

    // -------------- Add new product --------------
    addProduct: function (req_body, callback) {
        console.log("~~~~~ addProduct ~~~~~");

        var product = new Product();
        //product.id           = req_body.id ;      // auto generated
        product.title        = req_body.title;
        product.desc         = req_body.desc;
        product.date         = req_body.date;
        product.unitPrice    = req_body.unitPrice;
        product.dealerPrice  = req_body.dealerPrice;
        product.availableQty = req_body.availableQty;
        product.purchasedUnit   = req_body.purchasedUnit;
        product.purchasedQty    = req_body.purchasedQty;
        product.discountsCash   = req_body.discountsCash;
        product.discountsOthers = req_body.discountsOthers;
        product.image           = req_body.image;     //TODO: TBD

        product.save(function (err, product) {
            if (err) {
                console.log("Error adding new product: " + err);
                return callback(err);
            }
            console.log(product);
            callback (null, product);
        });
    },

    // -------------- Update a product --------------
    updateProduct: function (id, req_body, callback) {
        console.log("~~~~~ updateProduct ~~~~~");

        Product.findOne({ 'productId': id}, { 'id': 1, 'title': 1}, function (err, product) {
            if (err) return callback(err);

            product.productId    = req_body.id || product.id;
            product.title        = req_body.title || product.title;
            product.desc         = req_body.desc || product.desc ;
            product.date         = req_body.date || product.date ;
            product.unitPrice    = req_body.unitPrice || product.unitPrice ;
            product.dealerPrice  = req_body.dealerPrice || product.dealerPrice ;
            product.availableQty = req_body.availableQty || product.availableQty ;
            product.purchasedUnit   = req_body.purchasedUnit || product.purchasedUnit ;
            product.purchasedQty    = req_body.purchasedQty || product.purchasedQty ;
            product.discountsCash   = req_body.discountsCash || product.discountsCash ;
            product.discountsOthers = req_body.discountsOthers || product.discountsOthers ;
            product.image           = req_body.image || product.image ;

            product.save(function (err) {
                if (err) { console.log('Error in updating product'); return callback(err); }

                callback(null);
            })
        });
    },

    // -------------- Delete a product --------------
    deleteProduct: function (id, callback) {
        console.log("~~~~~ deleteproduct ~~~~~");

        Product.remove({ 'productId': id }, function (err, product) {
            callback(null);
        })
    }

}