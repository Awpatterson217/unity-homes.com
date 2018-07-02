export default function propertiesDetailsCtrl($scope, $stateParams, CacheService) {
  $scope.street = $stateParams.street;
}

propertiesDetailsCtrl.$inject = ['$scope', '$stateParams', 'CacheService'];
