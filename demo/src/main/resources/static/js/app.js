'use strict';

var userRegistrationApp = angular.module('userRegistrationApp', ['ngRoute', 'ngTouch','ngAnimate','ui.bootstrap']);

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
	    })
	    // route for the view user page
	    .when('/viewUser/:id', {
	        templateUrl : 'views/viewUser.html',
	        controller  : 'userController'
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


userRegistrationApp.controller('MenuController', function ($scope, $location) {
    $scope.isActive = function (path) {
       return $location.path() === path;
    }
});

userRegistrationApp.filter('nl2p', function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
    }
});
