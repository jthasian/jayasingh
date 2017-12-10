'use strict';

angular.module('userRegistrationApp').controller('userController', ['$scope', '$routeParams', 'UserService', 'Map','$uibModal', function ($scope, $routeParams, UserService, Map, $uibModal) {
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