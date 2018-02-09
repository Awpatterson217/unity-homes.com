export default function themeCtrl($scope) {
  console.log("settings controller");
  $scope.test = 'This is a test from settings';
}

themeCtrl.$inject = ['$scope'];
