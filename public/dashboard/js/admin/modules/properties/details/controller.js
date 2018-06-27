export default function propertiesDetailsCtrl($scope, $stateParams, CacheService) {
  $scope.id = $stateParams.id;
}

propertiesDetailsCtrl.$inject = ['$scope', '$stateParams', 'CacheService'];
