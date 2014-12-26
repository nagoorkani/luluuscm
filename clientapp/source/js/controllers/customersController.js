/**
 * Created by z062281 on 6/27/14.
 */

(function () {
    var CustomersController = function ($scope, $location, $filter, customerService) {
        $scope.customers = [];

        function init() {
            getCustomers();
        }

        function getCustomers() {
//            $scope.customers = [{'name': 'rehan'}, {'name': 'ahsan'}];
            customerService.getCustomers()
                .then(function (data) {
                    $scope.customers = data.results;
                    $scope.totalRecords = data.totalRecords;
                }, function(err){
                    $window.alert('Fetch customers failed!' + err.data.message);
                });
        }

        $scope.navigate = function (url) {
            $location.path(url);
        }

        init();
    }

    CustomersController.$inject = ['$scope', '$location', '$filter', 'customerService'];

    angular.module('luluuApp').controller('CustomersController', CustomersController);
}());

//App.controller('CustomersController', ['customerService', function ($scope, customerService) {
//
//
//}]);