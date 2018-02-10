export default function helpCtrl($scope) {
  console.log("Help controller");
  $scope.test = 'This is a test from help';
}

helpCtrl.$inject = ['$scope'];
