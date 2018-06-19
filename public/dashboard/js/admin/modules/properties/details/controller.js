export default function propertiesDetailsCtrl($scope, $stateParams) {
  console.log("propertiesDetailsCtrl controller");

  $scope.id = $stateParams.id;
}

propertiesDetailsCtrl.$inject = ['$scope', '$stateParams'];
