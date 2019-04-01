import angular from 'angular';
import 'angular-animate';

import '../styles/style.scss';

let socprimeApp = angular.module("socprimeApp", ['ngAnimate']);

import autocompleteList from  './directives/autocompleteList';
socprimeApp.directive('autocompleteList', autocompleteList);

import autocomplete from  './directives/autocomplete';
socprimeApp.directive('autocomplete', autocomplete);

socprimeApp.controller('Controller', ['$scope', function($scope) {
     $scope.namesSource = '/names';
}]);