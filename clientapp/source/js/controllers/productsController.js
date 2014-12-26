/**
 * Created by z062281 on 6/27/14.
 */

(function () {
    var ProductsController = function ($scope, $location, $filter, productService) {
        $scope.customers = [];

        function init() {
            getProducts();
        }

        function getProducts() {
//            $scope.customers = [{'name': 'rehan'}, {'name': 'ahsan'}];
            productService.getProducts()
                .then(function (data) {
                    $scope.products = data.results;
                    $scope.totalRecords = data.totalRecords;
                }, function(err){
                    $window.alert('Fetch products failed!' + err.data.message);
                });
        }

        $scope.navigate = function (url) {
            $location.path(url);
        }

        init();
    }

    ProductsController.$inject = ['$scope', '$location', '$filter', 'productService'];

    angular.module('luluuApp').controller('ProductsController', ProductsController);
}());

//App.controller('ProductsController', ['customerService', function ($scope, customerService) {
//
//
//}]);