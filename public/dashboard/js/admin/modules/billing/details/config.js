import template   from './template.html';
import controller from './controller.js';

export default function config($stateProvider) {
  $stateProvider
    .state('root.admin.billingDetails', {
        url: '/billings/details',
        controller: controller.name,
        template,
        params: {
            email: null,
            date: null
        }
    });
}

config.$inject = ['$stateProvider'];
