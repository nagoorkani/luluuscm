/**
 * Created by z062281 on 6/28/14.
 */

'use strict';

(function () {
    var productsFactory = function ($http, $q) {
        var baseUrl = 'http://localhost:6767',
            factory = {};

        factory.getProducts = function () {
//            return [{'name': 'rehan'}, {'name': 'ahsan'}];

            return $http.get(baseUrl + '/products').then(function (results) {
                var custs = results.data;
                return {
                    totalRecords: parseInt(results.headers('X-InlineCount')),
                    results: custs
                };
            });
        };

        factory.getProduct = function (id) {
            return $http.get(baseUrl + '/products/' + id).then(function (results) {
                return results.data;
            });
        };

        factory.insertProduct = function (product) {
            return $http.post(baseUrl + '/products', product).then(function (results) {
                product.id = results.data.id;
                return results.data;
            });
        };

        factory.newProduct = function () {
            return $q.when({});
        };

        factory.updateProduct = function (product) {
            return $http.put(baseUrl + '/products/' + product.id, product).then(function (status) {
                return status.data;
            });
        };

        factory.deleteProduct = function (id) {
            return $http.delete(baseUrl + '/products/' + id).then(function (status) {
                return status.data;
            });
        };


        return factory;
    };

    productsFactory.$inject = ['$http', '$q'];

    angular.module('luluuApp').factory('productService', productsFactory);

}());