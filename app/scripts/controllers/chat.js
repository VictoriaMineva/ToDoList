'use strict';
/**
 * @ngdoc function
 * @name toDoListApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('toDoListApp')
  .controller('ChatCtrl', function ($scope, simpleLogin, fbutil, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = fbutil.syncArray('messages');

    // display any errors
    $scope.messages.$loaded().catch(alert);

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

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        var date = new Date();
        var creator;
        if(profile == null)
        {
          creator = 'Unknown';
        }
        else
        {
          creator = profile.name;
        }
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage, creator: creator, date: date.getTime()})
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
