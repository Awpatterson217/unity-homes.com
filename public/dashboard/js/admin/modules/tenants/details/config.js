import template   from './template.html';
import controller from './controller.js';

export default function config($stateProvider) {
  $stateProvider
    .state('root.admin.tenantDetails', {
      url: '/tenants/details',
      controller: controller.name,
      template,
      params: {
        email: null
      }
    });
}

config.$inject = ['$stateProvider'];
