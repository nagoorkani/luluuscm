var App = angular.module('luluuApp', ['ngRoute', 'ui.bootstrap', 'angularFileUpload']);

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
}).directive('fallbackSource', function () {
    return {
        link: function postLink(scope, element, attributes) {

            if (sourceIsEmpty()) {
                useFallbackSource();
            } else {
                listenForSourceLoadingError();
            }

            function sourceIsEmpty() {
                var originalSource = element.attr('src');
                return originalSource ? false : true;
            }

            function useFallbackSource() {
                element.attr('src', attributes.fallbackSource);
            }

            function listenForSourceLoadingError() {
                element.bind('error', function () {
                    useFallbackSouce();
                });
            }
        }
    }
}).directive('imageSrc', function () {
    return{
        link: function postLink(scope, element, attrs) {
            attrs.$observe('imageSrc', function(newVal, oldVal){
                if(newVal != undefined){
                    var img = new Image();
                    img.src = attrs.actualSrc;
                    angular.element(img).bind('load', function () {
                        element.attr("src", attrs.actualSrc);
                    });
                }
            });

        }
    }
}).directive('fallbackSrc', function () {
    return{
        link: function postLink(scope, element, attrs) {
            element.bind('error', function () {
                angular.element(this).attr("src", attrs.fallbackSrc);
            });
        }
    }
});
