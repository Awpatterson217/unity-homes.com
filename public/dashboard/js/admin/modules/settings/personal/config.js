import template from './template.html'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.settings.personal', {
        url: '/personal',
        controller: controller.name,
        template,
    });
}

config.$inject = ['$stateProvider'];
