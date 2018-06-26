'use strict'

const injectables = [
  '$state',
  '$scope',
  'CacheService',
  'InitService',
];

  export default function Controller($state, $scope, CacheService, InitService) {
    $scope.hasData = false;

    const cache = CacheService();
    const init  = InitService();

    // TODO: Pass email from redis session to angularJS
    // TODO: Pass Stripe key from redis session to angularJS
    // Use localStorage?
    // const email = $window.localStorage.getItem('email');
    // const type  = $window.localStorage.getItem('type');

    // Test publishable key
    const STRIPE_API_KEY = 'pk_test_hdv1oJmfn5IRru1y5g3A6q1R';
    // Temporary
    const email = 'admin@unity.com';
    const type  = 'admin';

    cache.put("email", email);

    // Setup stripe, get/cache the appropriate data,
    // route application.
    init.init(type, STRIPE_API_KEY)
      .then(({ data, stripeSuccess }) => {
        cache.put('data', data);

        console.log('data: ', data);
        console.log('stripeSuccess', stripeSuccess);

        $scope.hasData = true;

        if (type === 'admin') {
          $state.go('root.admin.home');
        }

        if (type === 'tenant') {
          $state.go('root.tenant.home');
        }
      })
      .catch(error => {
        console.log('Error: ', error);
      });
}

Controller.$inject = injectables;
