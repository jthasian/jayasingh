'use strict';

angular.module('userRegistrationApp').controller('userController', ['$scope', '$routeParams', 'UserService', 'Map','$uibModal', function ($scope, $routeParams, UserService, Map, $uibModal, fileReader) {
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
	    
	    $scope.editProfile = function(){
	    	 $scope.modalInstance = $uibModal.open({
	    	 ariaLabelledBy: 'modal-title',
	    	 ariaDescribedBy: 'modal-body',
	    	 templateUrl: '../views/edit_profile_modal.html',
	    	 controller :'ModelHandlerController',
	    	 controllerAs: '$ctrl',
	    	 size: 'lg',
	    	 resolve: {
	    	 
	    	 }
	    	 });

	    }
	    
	    $scope.editAddress = function(){
	    	 $scope.modalInstance = $uibModal.open({
	    	 ariaLabelledBy: 'modal-title',
	    	 ariaDescribedBy: 'modal-body',
	    	 templateUrl: '../views/edit_address_modal.html',
	    	 controller :'AddressModalHandlerController',
	    	 controllerAs: '$ctrl',
	    	 size: 'lg',
	    	 resolve: {
	    	 
	    	 }
	    	 });

	    }
	    
	    $scope.editPhoto = function(){
	    	 $scope.modalInstance = $uibModal.open({
	    	 ariaLabelledBy: 'modal-title',
	    	 ariaDescribedBy: 'modal-body',
	    	 templateUrl: '../views/edit_photo_modal.html',
	    	 controller :'PhotoModalHandlerController',
	    	 controllerAs: '$ctrl',
	    	 size: 'lg',
	    	 resolve: {
	    	 
	    	 }
	    	 });

	    }
	    
	    $scope.imageSrc = "";
	    
	    $scope.$on("fileProgress", function(e, progress) {
	      $scope.progress = progress.loaded / progress.total;
	    });

	}]);

angular.module('userRegistrationApp').controller("ModelHandlerController", function($scope, $uibModalInstance){
	 
	 $scope.cancelModal = function(){
	 console.log("cancelmodal");
	 $uibModalInstance.dismiss('close');
	 }
	 $scope.ok = function(){
	 $uibModalInstance.close('save');
	 
	 }
});

angular.module('userRegistrationApp').controller("AddressModalHandlerController", function($scope, $uibModalInstance){
	 
	 $scope.cancelModal = function(){
	 console.log("cancelmodal");
	 $uibModalInstance.dismiss('close');
	 }
	 $scope.ok = function(){
	 $uibModalInstance.close('save');
	 
	 }
});

angular.module('userRegistrationApp').controller("PhotoModalHandlerController", function($scope, $uibModalInstance){
	 
	 $scope.cancelModal = function(){
	 console.log("cancelmodal");
	 $uibModalInstance.dismiss('close');
	 }
	 $scope.ok = function(){
	 $uibModalInstance.close('save');
	 
	 }
});

angular.module('userRegistrationApp').directive("ngFileSelect", function(fileReader, $timeout) {
    return {
      scope: {
        ngModel: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.ngModel = result;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
  });

angular.module('userRegistrationApp').factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});