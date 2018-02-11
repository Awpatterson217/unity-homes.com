import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import AngularSmartTable from 'angular-smart-table';
import AngularUiBootstrap from 'angular-ui-bootstrap';

import './assets/css/styles.css';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import rest from './js/common/rest';
import nav from './js/admin/modules/nav';
import dashboard from './js/admin/modules/dashboard'
import profile from './js/admin/modules/profile'
import tenants from './js/admin/modules/tenants'
import applicants from './js/admin/modules/applicants'
import properties from './js/admin/modules/properties'
import settings from './js/admin/modules/settings'
import help from './js/admin/modules/help'

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
