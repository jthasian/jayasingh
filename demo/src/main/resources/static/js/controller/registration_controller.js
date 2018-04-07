'use strict';

angular.module('userRegistrationApp').controller('registrationController', ['$scope', 'UserService', '$location', function ($scope, UserService, $location) {

		var user = this;
		user = [{"id":"null","firstName":"dddd","lastName":"","userName":"","password":"","repeatPassword":"","email":"","phoneNumber":"","address":{"id":null,"addressLine1":"","addressLine2":"","city":"","state":"","postalCode":"","country":"","latitude":null,"longitude":null},"active":null}];
		//This will hide the DIV by default.
	    $scope.IsVisible = false;
	    $scope.ShowHide = function () {
	        //If DIV is visible it will be hidden and vice versa.
	        $scope.IsVisible = $scope.showInMap;
	    }
	    
	    $scope.submit = function(userForm) {
	            console.log('Saving New User', user);
	            createUser($scope.user);
	    }

	    function createUser(user) {
	    	UserService.createUser(user)
	            .then(
	                function (errResponse) {
	                    console.error('Error while creating User');
	                }
	            );
	    }
	    function reset() {
	    	$scope.myForm.$setPristine(); //reset Form
	    }

	}]);