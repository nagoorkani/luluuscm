/**
 * Created by z062281 on 6/27/14.
 */

(function () {
    var ProductEditController = function ($rootScope, $scope, $location, $routeParams, productService, $timeout, modalService, $upload, $http) {

        var productId = parseInt($routeParams.productId) || 0;
        var timer, onRouteChangeOff;

        $scope.product      = {};
        $scope.title        = (productId > 0) ? 'Edit' : 'Add';
        $scope.buttonText   = (productId > 0) ? 'Update' : 'Add';
        $scope.updateStatus = false;
        $scope.errorMessage = '';
        $scope.productImage = '';
        $scope.fileReaderSupported = window.FileReader != null ;

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

        $scope.setDate = function(date) {
            $scope.purchasedDate = date;
        };

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
                if (!$scope.product.productId) {
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
                    productService.deleteProduct($scope.product.productId).then(function () {
                        onRouteChangeOff(); //Stop listening for location changes
                        $location.path('/products');
                    }, processError);
                }
            });
        };

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });

        $scope.upload = function (files) {
            var url = 'http://localhost:6767';
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    $upload.upload({
                        url: url + '/api/photo',
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' +
                        evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        $scope.product.img = url + "/" + data.file; // New file uploaded...
                        console.log('Old file ' + config.file.name + ', New file ' + $scope.product.img  +' uploaded. Response: ' +
                        JSON.stringify(data));
                    });
                }
            }
        };

        $scope.generateThumb = function(file) {
            if (file != null) {
                if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                    $timeout(function() {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function(e) {
                            $timeout(function() {
                                file.dataUrl = e.target.result;
                                //$scope.upload(file);
                            });
                        }
                    });
                }
            }
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

    ProductEditController.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'productService', '$timeout', 'modalService', '$upload', '$http'];

    angular.module('luluuApp').controller('ProductEditController', ProductEditController);
}());

//App.controller('ProductsController', ['productService', function ($scope, productService) {
//
//
//}]);

