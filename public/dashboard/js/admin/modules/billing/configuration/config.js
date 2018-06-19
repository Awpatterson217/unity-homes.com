import template   from './template.html';
import controller from './controller.js';

export default function config($stateProvider) {
  $stateProvider
    .state('root.admin.billingConfiguration', {
        url: '/billings/details',
        controller: controller.name,
        template,
    });
}

config.$inject = ['$stateProvider'];
