import template from './template.html'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.dashboard', {
        url: '/dashboard',
        controller: controller.name,
        template,
    });
}

config.$inject = ['$stateProvider'];
