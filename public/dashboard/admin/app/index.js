// Core Styles
import './index.scss';

// Core Angular
import angular from 'angular';

// These all export the module name
import ngAnimateModuleName from 'angular-animate';
import ngAriaModuleName from 'angular-aria';
import ngCookiesModuleName from 'angular-cookies';
import ngMaterialModuleName from 'angular-material';
import ngMessagesModuleName from 'angular-messages';
import ngRouteModuleName from 'angular-route';
import ngSanitizeModuleName from 'angular-sanitize';
import ngTouchModuleName from 'angular-touch';

// Global components
import footer from 'common/components/footer';
import header from 'common/components/header';
import menu from 'common/components/menu';
import title from 'common/components/title';

// All pages
import pages from './pages';

// Internal Services
import authInterceptor from 'common/services/authInterceptor';
import pageMetadata from 'common/services/pageMetadata';

import controller from './controller';
import configure from './configure';

const dependencies = [
  ngAnimateModuleName,
  ngAriaModuleName,
  ngCookiesModuleName,
  ngMaterialModuleName,
  ngMessagesModuleName,
  ngRouteModuleName,
  ngSanitizeModuleName,

  footer.name,
  header.name,
  menu.name,
  title.name,

  pages.name,

  authInterceptor.name,
  pageMetadata.name
];

// Include the ngTouch module if touch is supported
if (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) {
  dependencies.push(ngTouchModuleName);
}

angular.module('index', dependencies)
  .controller(controller.name, controller)
  .config(configure);