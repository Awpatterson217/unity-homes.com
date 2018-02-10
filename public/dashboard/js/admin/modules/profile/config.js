import template from './template.ejs'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.profile', {
        url: '/profile',
        controller: controller.name,
        template,
    });
}

config.$inject = ['$stateProvider'];
