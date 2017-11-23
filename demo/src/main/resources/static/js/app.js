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
	    })
	    // route for the view user page
	    .when('/viewUser', {
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

userRegistrationApp.controller('aboutController', function($scope) {
	console.log("in about")
    $scope.message = 'Look! I am an about page.';
});

userRegistrationApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';

});

userRegistrationApp.controller('searchUserController', function($scope, Map) {
    
    $scope.place = {};
    
    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
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
});

userRegistrationApp.service('Map', function($q) {
    
    this.init = function() {
    	var lat = '';
    	var lng = '';
    	if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              lat = pos.lat;
          	  lng = pos.lng;
              console.log( 'lat '+ lat + ' lng ' + lng ); 
    	})};
 
    	var options = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 13,
                disableDefaultUI: true    
            }
    	this.map = new google.maps.Map(
                document.getElementById("map"), options
            );
          	var marker = new google.maps.Marker({
        		map: this.map,
                position: new google.maps.LatLng(lat, lng),
                title: 'Ambarrukmo Plaza Yogyakarta'
                
              });
            this.places = new google.maps.places.PlacesService(this.map);
            console.log( 'this.places '+ this.places); 
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }
    
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

userRegistrationApp.controller('userController', function($scope, Map) {
    
    Map.init();
});