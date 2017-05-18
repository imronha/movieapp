'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MovieAddCtrl
 * @description
 * # MovieAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MovieAddCtrl', function ($scope, Movie, $location) {
    $scope.movie = {}; // Creating the movie obeject and attaching it to the scope
    $scope.saveMovie = function() {
      // $scope.movie changes as input changes because of two-way binding
      Movie.post($scope.movie).then(function() {
        $location.path('/movies'); // changing the url to '/movies'
      });
    };
  });
