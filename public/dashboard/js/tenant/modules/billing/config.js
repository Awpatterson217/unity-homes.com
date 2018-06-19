import template from './template.html'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.tenant.billing', {
        url: '/billing',
        controller: controller.name,
        template,
    });
}

config.$inject = ['$stateProvider'];
