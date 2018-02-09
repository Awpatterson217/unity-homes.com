import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import AngularSmartTable from 'angular-smart-table';
import AngularUiBootstrap from 'angular-ui-bootstrap';

import './assets/css/styles.css';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import nav from './modules/nav';
import rest from './common/rest';
import dashboard from './modules/dashboard'
import profile from './modules/profile'
import tenants from './modules/tenants'
import applicants from './modules/applicants'
import properties from './modules/properties'
import settings from './modules/settings'
import help from './modules/help'

const dependencies = [
  uirouter,
  AngularSmartTable,
  AngularUiBootstrap,
  nav,
  rest,
  dashboard,
  profile,
  tenants,
  applicants,
  properties,
  settings,
  help,
];

angular.module('app', dependencies)
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('root', {
        url: '',
        abstract: true,
    });
    $urlRouterProvider.otherwise('dashboard');
}]);
