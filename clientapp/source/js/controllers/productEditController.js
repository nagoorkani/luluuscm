/**
 * Created by z062281 on 6/27/14.
 */

(function () {
    var ProductEditController = function ($rootScope, $scope, $location, $routeParams, productService, $timeout, modalService) {

        var productId = parseInt($routeParams.productId) || 0;
        var timer, onRouteChangeOff;

        $scope.product      = {};
        $scope.title        = (productId > 0) ? 'Edit' : 'Add';
        $scope.buttonText   = (productId > 0) ? 'Update' : 'Add';
        $scope.updateStatus = false;
        $scope.errorMessage = '';

        function init() {
            if ( productId > 0 ) {
                getProduct(productId);
            } else {
                productService.newProduct().then(function (product) {
                    $scope.product = product;
                });
            }

            onRouteChangeOff = $rootScope.$on('$locationChangeStart', routeChange);

        }

        function getProduct(id) {
            productService.getProduct(id)
                .then(function (product) {
                    $scope.product = product[0];
                }, function(err){
                    $window.alert('Fetch products failed!' + err.data.message);
                });
        }

        $scope.saveProduct = function () {
            if ($scope.editForm.$valid) {
                if (!$scope.product.id) {
                    productService.insertProduct($scope.product).then(processSuccess, processError);
                }
                else {
                    productService.updateProduct($scope.product).then(processSuccess, processError);
                }
            }
        };

        $scope.deleteProduct = function () {
            var productName = $scope.product.name;
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Product',
                headerText: 'Delete ' + productName + '?',
                bodyText: 'Are you sure you want to delete this product?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    productService.deleteProduct($scope.product.id).then(function () {
                        onRouteChangeOff(); //Stop listening for location changes
                        $location.path('/products');
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

    ProductEditController.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'productService', '$timeout', 'modalService'];

    angular.module('luluuApp').controller('ProductEditController', ProductEditController);
}());

//App.controller('ProductsController', ['productService', function ($scope, productService) {
//
//
//}]);

