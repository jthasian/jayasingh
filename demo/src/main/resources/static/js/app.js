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


userRegistrationApp.controller('MenuController', function ($scope, $location) {
    $scope.isActive = function (path) {
       return $location.path() === path;
    }
});