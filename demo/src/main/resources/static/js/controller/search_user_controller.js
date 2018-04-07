'use strict';

angular.module('userRegistrationApp').controller('searchUserController', ['$scope', 'UserService', 'Map', function ($scope, UserService, Map) {
	    
	    $scope.place = {};
	    $scope.users = [];
	    
	    $scope.search = function() {
	        $scope.apiError = false;
	        //alert($scope.searchPlace);
	        Map.search($scope.searchPlace)
	        .then(
	            function(res) { // success
	                Map.addMarker(res);
	                $scope.place.name = res.name;
	                $scope.place.lat = res.geometry.location.lat();
	                $scope.place.lng = res.geometry.location.lng();
	                
	                fetchAllUsersByLocation($scope.place.lat, $scope.place.lng);                
	                
	            },
	            function(status) { // error
	                $scope.apiError = true;
	                $scope.apiStatus = status;
	            }
	        );
	    }
	    
	    $scope.send = function() {
	        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
	    }
	    
	    Map.init();
	    
	    
		
			    
	    function fetchAllUsersByLocation(lat, lng) {
	        UserService.fetchAllUsersByLocation(lat, lng)
	            .then(
	                function (d) {
	                	$scope.users = d;
	                	$scope.users.forEach(function(obj) { 
	                		
	                		console.log(obj.address.location.x); 
	                		
	                		Map.addMarkerForUser(obj.address.location.x, obj.address.location.y, obj.firstName);
	                	});
		                
	                },
	                function (errResponse) {
	                    console.error('Error while fetching Users');
	                }
	            );
	    }
	}]);
