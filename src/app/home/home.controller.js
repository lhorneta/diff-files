'use strict';

angular.module('ang04')

  .controller('HomeCtrl', function ($scope, $window, diffService) {

    window.scope = $scope;
    $scope.compare = false;
    $scope.files = {};

    //files upload
    $scope.uploadFile = function(element){

      diffService.getJsonFromAjax(element).then(function(response) {
          
          $scope.files = Object.assign($scope.files, response);

           if (Object.keys($scope.files).length === 2) {
             $scope.compare = true;
             $scope.left = $scope.files.file;
             $scope.right = $scope.files.file2;
           }

      });

    }

    //show diff desc
    $scope.showTable = false;
    $scope.showCompare = function(){$scope.showTable = true;}

    //diff-match-patch
    $scope.options = {
      editCost: 4,
      interLineDiff: true,
      attrs: {
        insert: {
          'data-attr': 'insert',
          'class': 'insertion'
        },
        delete: {
          'data-attr': 'delete'
        },
        equal: {
          'data-attr': 'equal'
        }
      }
    }
	
  });
