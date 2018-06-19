export default function adminCtrl($window) {
  const email = $window.localStorage.getItem('email');

  console.log("admin controller");
}

adminCtrl.$inject = ['$window', '$cacheFactory'];
