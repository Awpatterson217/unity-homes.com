import template from './template.html'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.settings.theme', {
        url: '/theme',
        controller: controller.name,
        template,
    });
}

config.$inject = ['$stateProvider'];
