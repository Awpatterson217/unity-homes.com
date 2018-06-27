export default function applicationCtrl($scope, $stateParams, CacheService) {

  $scope.email = $stateParams.email;
}

applicationCtrl.$inject = ['$scope', '$stateParams', 'CacheService'];
