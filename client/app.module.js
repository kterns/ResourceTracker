'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('responseTrackerApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.
		when('/', {
			templateUrl: 'templates/responseTracker/tracker.html',
			controller: 'responseTrackerController'
		}).
		otherwise({
			redirectTo: '/'
		});
});
