import template from './template.html';

class controller {
  constructor() {
    // Todo: get from cache service
    // How to inject into class w/o ng-annotate?
    this.email = 'tenant@unity.com';
  }

  $onInit() {
    console.log('Nav initiated');
  }
}

const Nav = {
  template,
  controller,
};

export default Nav;
