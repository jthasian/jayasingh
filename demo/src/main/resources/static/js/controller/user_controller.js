'use strict';

angular.module('userRegistrationApp').controller('userController', ['$scope', '$routeParams', 'UserService', 'Map', function ($scope, $routeParams, UserService, Map) {
		//$scope.edit = function (id) {
	    console.log('id to be edited', $routeParams.id);
	        
	    fetchUser($routeParams.id);

	    function fetchUser(id) {
	        UserService.fetchUser(id)
	            .then(
	                function (d) {
	                	$scope.user = d;	                	
	                	var address = $scope.user.address.addressLine1 + ', ' +
	                					$scope.user.address.addressLine2 + ', ' +
	                					$scope.user.address.city + ', ' +
	                					$scope.user.address.state + ', ' +
	                					$scope.user.address.country + ', ' +
	                					$scope.user.address.postalCode;
	                	//alert($scope.user.address.latitude);
	                	//alert(address);
	                	Map.viewUserMap(address, $scope.user.address.latitude, $scope.user.address.longitude);  
	                },
	                function (errResponse) {
	                    console.error('Error while fetching Users');
	                }
	            );
	    }
	    //}
	    //alert($scope.user.address.latitude);
	    //Map.viewUserMap($scope.user.address.latitude, $scope.user.address.longitude);  
	    
	}]);