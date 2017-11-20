'use strict';

var userRegistrationApp = angular.module('userRegistrationApp', ['ngRoute']);

// configure our routes
userRegistrationApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'homeController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'views/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'views/contact.html',
            controller  : 'contactController'
        })
        // route for the contact page
	    .when('/searchUser', {
	        templateUrl : 'views/searchUser.html',
	        controller  : 'searchUserController'
	    })
	 	// route for the contact page
	    .when('/registration', {
	        templateUrl : 'views/registration.html',
	        controller  : 'registrationController'
	    });
});

// create the controller and inject Angular's $scope
userRegistrationApp.controller('homeController', ['$scope', 'UserService', function ($scope, UserService) {
	$scope.users = [];
	
	fetchAllUsers();

    function fetchAllUsers() {
        UserService.fetchAllUsers()
            .then(
                function (d) {
                	$scope.users = d;
                },
                function (errResponse) {
                    console.error('Error while fetching Users');
                }
            );
    }
}]);

userRegistrationApp.controller('aboutController', function($scope) {
	console.log("in about")
    $scope.message = 'Look! I am an about page.';
});

userRegistrationApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';

});

userRegistrationApp.controller('searchUserController', function($scope) {
	

});

userRegistrationApp.directive('googleplace', function() {
	
	var placeSearch, autocomplete;
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {country: 'in'}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
                
            });
           
        
        }
    };
});

userRegistrationApp.controller('MenuController', function ($scope, $location) {
    $scope.isActive = function (path) {
       return $location.path() === path;
    }
});

userRegistrationApp.controller('registrationController', function ($scope, $location) {
	//This will hide the DIV by default.
    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.showInMap;
    }
});