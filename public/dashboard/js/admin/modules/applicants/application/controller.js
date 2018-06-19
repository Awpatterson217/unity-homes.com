export default function applicationCtrl($scope, $stateParams) {
  console.log("applicationCtrl controller");

  $scope.email = $stateParams.email;
}

applicationCtrl.$inject = ['$scope', '$stateParams'];
