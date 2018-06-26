"use strict"

export default function CacheService($cacheFactory) {
  return function(name = 'unity') {
    function Service() {
      this.cache = $cacheFactory.get(name) || $cacheFactory(name);
    }

    Service.prototype.put = function(key, value) {
      if (key && value) {
        this.cache.put(key, value);
      }
    }

    Service.prototype.get = function(key) {
      return this.cache.get(key);
    }

    Service.prototype.remove = function(key) {
      this.cache.remove(key);
    }

    Service.prototype.removeAll = function() {
      this.cache.removeAll();
    }

    Service.prototype.destroy = function() {
      this.cache.destroy();
    }

    Service.prototype.info = function() {
      return this.cache.info();
    }
    
    return new Service();
  }
}

CacheService.$inject = ['$cacheFactory'];
