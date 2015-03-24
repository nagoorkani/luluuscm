/**
 * Created by z062281 on 6/27/14.
 */

(function () {
    var CustomersController = function ($scope, $location, $filter, customerService, modalService) {
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

        //$scope.remove = function(index){
        //                var todo = $scope.todos[index];
        //                Todos.remove({id: todo._id}, function(){
        //                      $scope.todos.splice(index, 1);
        //                    });
        //              }

        //$scope.remove = function (id) {
        //
        //    var modalOptions = {
        //        closeButtonText: 'Cancel',
        //        actionButtonText: 'Delete Customer',
        //        headerText: 'Delete ' + id + '?',
        //        bodyText: 'Are you sure you want to delete this customer?'
        //    };
        //
        //    modalService.showModal({}, modalOptions).then(function (result) {
        //        if (result === 'ok') {
        //            customerService.deleteCustomer(id).then(function () {
        //                //onRouteChangeOff(); //Stop listening for location changes
        //                $location.path('/customers');
        //            }, function(){
        //                alert("Could not remove a customer!");
        //            });
        //        }
        //    });
        //};

        init();
    }

    CustomersController.$inject = ['$scope', '$location', '$filter', 'customerService', 'modalService'];

    angular.module('luluuApp').controller('CustomersController', CustomersController);
}());

//App.controller('CustomersController', ['customerService', function ($scope, customerService) {
//
//
//}]);
