export default function profileCtrl($scope) {
  console.log("profile controller");
  $scope.test = 'This is a test from profile';
}

profileCtrl.$inject = ['$scope'];
