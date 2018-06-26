export default function propertiesDetailsCtrl($scope, $stateParams) {
  $scope.id = $stateParams.id;
}

propertiesDetailsCtrl.$inject = ['$scope', '$stateParams'];
