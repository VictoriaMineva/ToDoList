'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('TaskCtrl', function ($scope, simpleLogin, fbutil) {

	  // create a synchronized array for use in our HTML code
	$scope.data = fbutil.syncArray('tasks');
	$scope.newTask = {};

	$scope.user = simpleLogin.getUser();

	if($scope.user !== null)
	{
		var profile;
	    if( profile ) {
	    	profile.$destroy();
	    }
	    profile = fbutil.syncObject('users/'+$scope.user.uid);
	    profile.$bindTo($scope, 'profile');
	}

	$scope.addTask = function(task, deadline) {
		var creator;
		if(profile == null)
		{
			creator = 'Unknown';
		}
		else
		{
			console.log('here');
			creator = profile.name;
		}
		if(deadline == null)
		{
			deadline = new Date();
		}
    	$scope.data.$add({task: task, status: false, deadline: deadline.getTime(), createdBy: creator, editedBy: ""});
    	$scope.newTask = {};
  	};
    
	$scope.editTask = function(id, task) {
		// change a message and save it
		var editor;
		if(profile == null)
		{
			editor = 'Unknown';
		}
		else
		{
			editor = profile.name;
		}
		var item = $scope.data.$getRecord(id);
		item.task = task;
		item.editedBy = editor;
		$scope.data.$save(item);
		  // data has been saved to Firebase
	};

	$scope.isDone = function(id, status) {
		// change a message and save it
		var item = $scope.data.$getRecord(id);
		item.status = status;
		$scope.data.$save(item);
		  // data has been saved to Firebase
	};
			
	$scope.removeTask = function(id) {
		var item = $scope.data.$getRecord(id);
		$scope.data.$remove(item);
	};
  });
