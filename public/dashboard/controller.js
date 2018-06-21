'use strict'

const injectables = [
  '$window',
  '$state',
  '$scope',
  '$timeout',
  'CacheService',
  'InitService',
];

  export default function Controller($window, $state, $scope, $timeout, CacheService, InitService) {
    console.log('dashboard controller loaded');
    // TODO: Pass email from redis session to angularJS
    // Use localStorage?
    // const email = $window.localStorage.getItem('email');
    // const type  = $window.localStorage.getItem('type');

    const cache = CacheService();
    const init  = InitService();

    const email = 'admin@unity.com';
    const type  = 'admin';

    cache.put("email", email);

    init.getAllData()
      .then(data => {
        cache.put('data', data);
        console.log('data: ', data);
      })
      .catch(error => {
        console.log('Error: ', error);
      });

    // Temp, need API service
    $scope.hasData = false;

    // Temp, demonstrates loader
    function checkForData() {
      $scope.hasData = true;

      if (type === 'admin') {
        $state.go('root.admin.home');
      }

      if (type === 'tenant') {
        $state.go('root.tenant.home');
      }
    }

    $timeout(checkForData, 1500);
}

Controller.$inject = injectables;
