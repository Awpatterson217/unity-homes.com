import template from './template.ejs'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.settings', {
        url: '/settings',
        controller: controller.name,
        template,
    });
}

config.$inject = ['$stateProvider'];
