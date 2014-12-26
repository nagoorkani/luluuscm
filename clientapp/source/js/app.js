var App = angular.module('luluuApp', ['ngRoute', 'ui.bootstrap']);

App.directive('appHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/common/header.html',
            controller: 'HeaderController'
        }
    }).config(function ($routeProvider) {
        $routeProvider
            .when('/customers', {
                controller: 'CustomersController',
                templateUrl: 'templates/states/customers.html'
            })
            .when('/customers/:customerId', {
                controller: 'CustomerEditController',
                templateUrl: 'templates/states/customerEdit.html'
            })
            .when('/products', {
                controller: 'ProductsController',
                templateUrl: 'templates/states/products.html'
            })
            .when('/products/:productId', {
                controller: 'ProductEditController',
                templateUrl: 'templates/states/productEdit.html'
            })
            .when('/about', {
                templateUrl: 'templates/states/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/customers'
            });
     });