import template from './template.ejs'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.tenants', {
        url: '/tenants',
        controller: controller.name,
        template,
    });
}

config.$inject = ['$stateProvider'];
