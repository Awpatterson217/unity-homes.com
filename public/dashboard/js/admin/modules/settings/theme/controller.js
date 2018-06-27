export default function themeCtrl($scope, CacheService) {
  $scope.test = 'This is a test from settings';
}

themeCtrl.$inject = ['$scope', 'CacheService'];
