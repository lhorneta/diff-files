'use strict';

angular.module('ang04', ['ui.router','diff-match-patch'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })

    $urlRouterProvider.otherwise('/home');
  });