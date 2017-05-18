'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:3000');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        // controllerAs: 'movies'
        // Removed above line. Moves now show up in table of /movies
      })
      .when('/create/movie', {
        templateUrl: 'views/movie-add.html',
        controller: 'MovieAddCtrl',
        controllerAs: 'movieAdd'
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie-view.html',
        controller: 'MovieViewCtrl',
        controllerAs: 'movieView'
      })
      .when('/movie/:id/delete', {
        templateUrl: 'views/movie-delete.html',
        controller: 'MovieDeleteCtrl',
        controllerAs: 'movieDelete'
      })
      .when('/movie/:id/edit', {
        templateUrl: 'views/movie-edit.html',
        controller: 'MovieEditCtrl',
        controllerAs: 'movieEdit'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  // This .factory changes the 'id' to '_id' to match the API '_id' but restangular is expecting 'id'.
  .factory('MovieRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  })
  // Gives the ability to create and list new movies
  // Create a movie, pass in the MovieRestangular and return the MovieRestangular service named 'movie'
  .factory('Movie', function(MovieRestangular) {
    return MovieRestangular.service('movie'); // Fetches the 'Movie' from the 'movie' enpoint in the API
  })
  // Angular directive lets you create a new html element type eg <youtube></youtube>
  .directive('youtube', function() {
  return {
    restrict: 'E', // Retrict to the element
    scope: { // Allows parameters to be passed to the new directive eg <youtube src=http...>
      src: '='
    },
    templateUrl: 'views/youtube.html'
  };
  })
  // MUST include a filter to to trust untrusted links aka youtube links
  .filter('trusted', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
});
