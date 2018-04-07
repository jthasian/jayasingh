'use strict';

angular.module('userRegistrationApp').service('Map', function($q) {
		
		var map;
		var marker
		this.init = function() {
			if(!!navigator.geolocation) {
				
				
				var mapOptions = {
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				map = new google.maps.Map(document.getElementById('map'), mapOptions);
			
				navigator.geolocation.getCurrentPosition(function(position) {
				
					var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

					marker = new google.maps.Marker({
		        		map: map,
		                position: geolocate,
		                title: 'You are here'
		                
		              });
		            				
					map.setCenter(geolocate);
					
				});
				
			} else {
				document.getElementById('map').innerHTML = 'No Geolocation Support.';
			}
			this.places = new google.maps.places.PlacesService(map);
		}
		
		this.viewUserMap = function(address, latitude, longitude) {
			if(!!navigator.geolocation) {
				
				   
				
				var mapOptions = {
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				map = new google.maps.Map(document.getElementById('map'), mapOptions);
				if(latitude != null && longitude != null) {
					//navigator.geolocation.getCurrentPosition(function(position) {
					
					var geolocate = new google.maps.LatLng(latitude, longitude);

					var marker = new google.maps.Marker({
		        		map: map,
		                position: geolocate,
		                title: 'You are here'
		              });
		            				
					map.setCenter(geolocate);
					
				//});

				} else {
					var geocoder = new google.maps.Geocoder();

					   geocoder.geocode({
					      'address': address
					   }, 
					   function(results, status) {
					      if(status == google.maps.GeocoderStatus.OK) {
					         new google.maps.Marker({
					            position: results[0].geometry.location,
					            map: map
					         });
					         map.setCenter(results[0].geometry.location);
					      }
					   });

				}								
							
			} else {
				document.getElementById('map').innerHTML = 'No Geolocation Support.';
			}
			this.places = new google.maps.places.PlacesService(map);
		}
		
//	    this.init = function() {
//	    	var lat = '';
//	    	var lng = '';
//	    	if (!!navigator.geolocation) {
//	            navigator.geolocation.getCurrentPosition(function(position) {
//	              var pos = {
//	                lat: position.coords.latitude,
//	                lng: position.coords.longitude
//	              };
//	              lat = pos.lat;
//	          	  lng = pos.lng;
//	              console.log( 'lat '+ lat + ' lng ' + lng ); 
	//
//	              openMap(lat, lng);
//	    	})};
//	    }
	//    
//	    var openMap = function(lat, lng) {
//	    	var options = {
//	                center: new google.maps.LatLng(lat, lng),
//	                zoom: 13,
//	                disableDefaultUI: true    
//	            }
//	    	this.map = new google.maps.Map(
//	                document.getElementById("map"), options
//	            );
//	          	var marker = new google.maps.Marker({
//	        		map: this.map,
//	                position: new google.maps.LatLng(lat, lng),
//	                title: 'Ambarrukmo Plaza Yogyakarta'
//	                
//	              });
//	            this.places = new google.maps.places.PlacesService(this.map);
//	            
//	            var geolocate = new google.maps.LatLng(lat, lng);
//	            
//	            var infowindow = new google.maps.InfoWindow({
//	                map: this.map,
//	                position: geolocate,
//	                content:
//	                    '<h1>Location pinned from HTML5 Geolocation!</h1>' +
//	                    '<h2>Latitude: ' + lat + '</h2>' +
//	                    '<h2>Longitude: ' + lng + '</h2>'
//	            });
//	            
//	            this.map.setCenter(geolocate);
//	            
//	            console.log( 'this.places '+ this.places[0]); 
//	    }
	    
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
	    	if(marker) marker.setMap(null);
	    	marker = '';
	        marker = new google.maps.Marker({
	            map: map,
	            position: res.geometry.location,
	            animation: google.maps.Animation.DROP,
	            title: res.formatted_address
	        });
	        //map.setCenter(res.geometry.location);
	        
	       
	        map.setCenter(res.geometry.location);
	    }
	    
	    this.addMarkerForUser = function(lat, lng, address) {
	    	var geolocate = new google.maps.LatLng(lat, lng);
	        marker = new google.maps.Marker({
	            map: map,
	            position: geolocate,
	            animation: google.maps.Animation.DROP,
	            title: address,
	            icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
	        });
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
	        scope: {
	            ngModel: '=',
	            address1: "=",
	            address2: "=",
	            city: "=",
	            state: "=",
	            country: "=",
	            zip: '=',
	            latitude: '=',
	            longitude: '=',
	        },
	        link: function(scope, element, attrs, model) {
	            var options = {
	                types: []
	            };
	            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

	            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
	                scope.$apply(function() {
	                	
	                	
	                	var place = scope.gPlace.getPlace();
	                	
	                    var components = place.address_components;  // from Google API place object   

	                    scope.address1 = getStreetNumber(place) + ", " + getStreet(place);
	                    scope.address2 = getArea(place) + ", " + getSubArea1(place) + ", " + getSubArea2(place);
	                    scope.city =  getCity(place);
	                    scope.state = getState(place);
	                    scope.country = getCountryShort(place);
	                    scope.zip = getPostCode(place);
	                    scope.latitude = getLatitude(place);
	                    scope.longitude = getLongitude(place);
	                    model.$setViewValue(element.val());    
	                });
	                
	            });
	           
	            
	        }
	    };
	    
	    function getAddrComponent(place, componentTemplate) {
	        var result;
	        if (!isGooglePlace(place))
	          return;
	        for (var i = 0; i < place.address_components.length; i++) {
	          var addressType = place.address_components[i].types[0];
	          if (componentTemplate[addressType]) {
	            result = place.address_components[i][componentTemplate[addressType]];
	            return result;
	          }
	        }
	        return;
	      }
	    	
	    function isGooglePlace(place) {
	        if (!place)
	      		return false;
	      	return !!place.place_id;
	      }
	    	  function getPlaceId(place) {
	          if (!isGooglePlace(place))
	        	    return;
	        	return place.place_id;
	        }
	    	  function getPremise(place) {
	              var COMPONENT_TEMPLATE = { floor: 'long_name' },
	            	    streetNumber = getAddrComponent(place, COMPONENT_TEMPLATE);
	        		  return streetNumber;
	            }
	    	  
	        function getStreetNumber(place) {
	          var COMPONENT_TEMPLATE = { street_number: 'short_name' },
	        	    streetNumber = getAddrComponent(place, COMPONENT_TEMPLATE);
	    		  return streetNumber;
	        }
	    	
	        function getStreet(place) {
	          var COMPONENT_TEMPLATE = { route: 'long_name' },
	        	    street = getAddrComponent(place, COMPONENT_TEMPLATE);
	    		  return street;
	        }
	        
	        function getArea(place) {
	            var COMPONENT_TEMPLATE = { neighborhood: 'long_name' },
	          	    street = getAddrComponent(place, COMPONENT_TEMPLATE);
	      		  return street;
	          }
	        
	        function getSubArea1(place) {
	            var COMPONENT_TEMPLATE = { sublocality_level_1: 'long_name' },
	          	    street = getAddrComponent(place, COMPONENT_TEMPLATE);
	      		  return street;
	          }
	        
	        function getSubArea2(place) {
	            var COMPONENT_TEMPLATE = { sublocality_level_2: 'long_name' },
	          	    street = getAddrComponent(place, COMPONENT_TEMPLATE);
	      		  return street;
	          }
	    	
	        function getCity(place) {
	          var COMPONENT_TEMPLATE = { locality: 'long_name' },
	        	    city = getAddrComponent(place, COMPONENT_TEMPLATE);
	    		  return city;
	        }
	    	
	        function getState(place) {
	          var COMPONENT_TEMPLATE = { administrative_area_level_1: 'long_name' },
	        	    state = getAddrComponent(place, COMPONENT_TEMPLATE);
	        	return state;
	        }
	        
	        function getDistrict(place) {
	          var COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
	      	      state = getAddrComponent(place, COMPONENT_TEMPLATE);
	        	return state;
	        }
	    	
	        function getCountryShort(place) {
	          var COMPONENT_TEMPLATE = { country: 'short_name' },
	        	    countryShort = getAddrComponent(place, COMPONENT_TEMPLATE);
	        	return countryShort;
	        }
	    	
	        function getCountry(place) {
	        var COMPONENT_TEMPLATE = { country: 'long_name' },
	            country = getAddrComponent(place, COMPONENT_TEMPLATE);
	      	return country;
	      }
	      
	      function getPostCode(place) {
	        var COMPONENT_TEMPLATE = { postal_code: 'long_name' },
	            postCode = getAddrComponent(place, COMPONENT_TEMPLATE);
	        return postCode;
	      }
	      
	      function isGeometryExist(place) {
	        return angular.isObject(place) && angular.isObject(place.geometry);
	      }
	      
	      function getLatitude(place) {
	        if (!isGeometryExist(place)) return;
	        return place.geometry.location.lat();
	      }
	      
	      function getLongitude(place) {
	        if (!isGeometryExist(place)) return;
	        return place.geometry.location.lng();
	      }
	});