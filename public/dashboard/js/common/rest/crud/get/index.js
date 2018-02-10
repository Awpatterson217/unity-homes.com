export default function getRequest($http) {
  return function(url) {
    return $http({
      method: 'GET',
      url,
    });
  } 
};

getRequest.$inject = ['$http'];
