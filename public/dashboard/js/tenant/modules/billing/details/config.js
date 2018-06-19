import template   from './template.html';
import controller from './controller.js';

export default function config($stateProvider) {
  $stateProvider
    .state('root.tenant.billingsDetails', {
        url: '/billing/details',
        controller: controller.name,
        template,
        params: {
            date: null
        }
    });
}

config.$inject = ['$stateProvider'];
