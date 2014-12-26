/**
 * Created by z062281 on 6/28/14.
 */

'use strict';

(function () {
    var customersFactory = function ($http, $q) {
        var baseUrl = 'http://localhost:6767',
            factory = {};

        factory.getCustomers = function () {
//            return [{'name': 'rehan'}, {'name': 'ahsan'}];

            return $http.get(baseUrl + '/customers').then(function (results) {
                var custs = results.data;
                return {
                    totalRecords: parseInt(results.headers('X-InlineCount')),
                    results: custs
                };
            });
        };

        factory.getCustomer = function (id) {
            return $http.get(baseUrl + '/customers/' + id).then(function (results) {
                return results.data;
            });
        };

        factory.insertCustomer = function (customer) {
            return $http.post(baseUrl + '/customers', customer).then(function (results) {
                customer.customerId = results.data.customerId;
                return results.data;
            });
        };

        factory.newCustomer = function () {
            return $q.when({});
        };

        factory.updateCustomer = function (customer) {
            return $http.put(baseUrl + '/customers/' + customer.customerId, customer).then(function (status) {
                return status.data;
            });
        };

        factory.deleteCustomer = function (id) {
            return $http.delete(baseUrl + '/customers/' + id).then(function (status) {
                return status.data;
            });
        };


        return factory;
    };

    customersFactory.$inject = ['$http', '$q'];

    angular.module('luluuApp').factory('customerService', customersFactory);

}());
