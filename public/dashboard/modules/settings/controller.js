export default function settingsCtrl($scope) {
  console.log("settings controller");
  $scope.test = 'This is a test from settings';
}

settingsCtrl.$inject = ['$scope'];
