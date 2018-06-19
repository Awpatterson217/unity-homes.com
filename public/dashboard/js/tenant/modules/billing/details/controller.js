export default function billingsDetailsCtrl($scope, $stateParams) {
  console.log("billingsDetailsCtrl controller");

  $scope.date = $stateParams.date;
}

billingsDetailsCtrl.$inject = ['$scope', '$stateParams'];
