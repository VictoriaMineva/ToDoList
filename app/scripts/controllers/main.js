'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
