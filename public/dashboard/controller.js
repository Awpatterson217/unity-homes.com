'use strict'

const injectables = [
  '$state',
  '$scope',
  '$cookies',
  'CacheService',
  'InitService',
];

  export default function Controller($state, $scope, $cookies, CacheService, InitService) {
    // Temporary, will need token or Oauth.
    // Maybe create auth service?
    const EMAIL = $cookies.get('email');
    const TYPE  = $cookies.get('type');
    const STRIPE_PUBLISHABLE_KEY = $cookies.get('stripe_publishable_key');

    $scope.hasData = false;

    const cache = CacheService();
    const init  = InitService();

    cache.put("email", EMAIL);

    init.init(TYPE, STRIPE_PUBLISHABLE_KEY)
      .then(({ data, stripeSuccess }) => {
        cache.put('data', angular.copy(data));

        console.log('data: ', data);
        console.log('stripeSuccess', stripeSuccess);

        // If there is no data, display error page.
        // Make error page route?
        $scope.hasData = true;

        if (TYPE === 'admin') {
          $state.go('root.admin.home');
        }

        if (TYPE === 'tenant') {
          $state.go('root.tenant.home');
        }
      })
      .catch(error => {
        console.log('Error: ', error);
      });
}

Controller.$inject = injectables;
