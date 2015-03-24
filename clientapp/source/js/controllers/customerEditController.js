/**
 * Created by z062281 on 6/27/14.
 */

(function () {
    var CustomerEditController = function ($rootScope, $scope, $location, $routeParams, customerService, $timeout, modalService) {

        var customerId = parseInt($routeParams.customerId) || 0;
        var timer, onRouteChangeOff;

        $scope.customer     = {};
        $scope.title        = (customerId > 0) ? 'Edit' : 'Add';
        $scope.buttonText   = (customerId > 0) ? 'Update' : 'Add';
        $scope.updateStatus = false;
        $scope.errorMessage = '';

        function init() {
            if ( customerId > 0 ) {
                getCustomer(customerId);
            } else {
                console.log("New customer");
                customerService.newCustomer().then(function (customer) {
                    $scope.customer = customer;
                });
            }
            onRouteChangeOff = $rootScope.$on('$locationChangeStart', routeChange);
        }

        function getCustomer(id) {
            customerService.getCustomer(id)
                .then(function (customer) {
                    $scope.customer = customer[0];
                }, function(err){
                    $window.alert('Fetch customers failed!' + err.data.message);
                });
        }

        $scope.saveCustomer = function () {
            if ($scope.editForm.$valid) {
                if (!$scope.customer.customerId) {
                    customerService.insertCustomer($scope.customer).then(processSuccess, processError);
                }
                else {
                    customerService.updateCustomer($scope.customer).then(processSuccess, processError);
                }
            }
        };

        $scope.deleteCustomer = function () {
            var customerName = $scope.customer.name;
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Customer',
                headerText: 'Delete ' + customerName + '?',
                bodyText: 'Are you sure you want to delete this customer?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    customerService.deleteCustomer($scope.customer.customerId).then(function () {
                        onRouteChangeOff(); //Stop listening for location changes
                        $location.path('/customers');
                    }, processError);
                }
            });
        };

        function routeChange(event, newUrl) {
            //Navigate to newUrl if the form isn't dirty
            if (!$scope.editForm.$dirty) return;

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Ignore Changes',
                headerText: 'Unsaved Changes',
                bodyText: 'You have unsaved changes. Leave the page?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    onRouteChangeOff(); //Stop listening for location changes
                    $location.path(newUrl); //Go to page they're interested in
                }
            });

            //prevent navigation by default since we'll handle it
            //once the user selects a dialog option
            event.preventDefault();
            return;
        }

        function processSuccess() {
            $scope.editForm.$dirty = false;
            $scope.updateStatus = true;
            $scope.title = 'Edit';
            $scope.buttonText = 'Update';
            startTimer();

            // route to customer home page
            $location.path('/customers');
        }

        function processError(error) {
            $scope.errorMessage = error.message;
            startTimer();
        }

        function startTimer() {
            timer = $timeout(function () {
                $timeout.cancel(timer);
                $scope.errorMessage = '';
                $scope.updateStatus = false;
            }, 3000);
        }
        init();
    }

    CustomerEditController.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'customerService', '$timeout', 'modalService'];

    angular.module('luluuApp').controller('CustomerEditController', CustomerEditController);
}());

//App.controller('CustomersController', ['customerService', function ($scope, customerService) {
//
//
//}]);

