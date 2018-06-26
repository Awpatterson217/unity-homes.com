import template from './template.html';

class controller {
  constructor(CacheService) {
    this.cache = CacheService();
    this.email = this.cache.get('email');
  }

  $onInit() {}
}

controller.$inject = ['CacheService'];

const Nav = {
  template,
  controller,
};

export default Nav;
