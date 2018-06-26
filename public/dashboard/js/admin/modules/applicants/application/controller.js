export default function applicationCtrl($scope, $stateParams) {

  $scope.email = $stateParams.email;
}

applicationCtrl.$inject = ['$scope', '$stateParams'];
