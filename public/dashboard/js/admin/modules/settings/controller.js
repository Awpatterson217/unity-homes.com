export default function settingsCtrl($scope, CacheService) {
  $scope.test = 'This is a test from settings';
}

settingsCtrl.$inject = ['$scope', 'CacheService'];
