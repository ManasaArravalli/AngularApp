
var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);
animateApp.controller('LoginCtrl', function($scope, $http, $location, authentication) {
  $scope.login = function() {
    if ($scope.username === 'admin' && $scope.password === 'pass') {
      console.log('successful')
      authentication.isAuthenticated = true;
      authentication.user = { name: $scope.username };
      $location.url("/home");
    } else {
      $scope.loginError = "Invalid username/password combination";
      console.log('Login failed..');
    };
  };
});

animateApp.controller('AppCtrl', function($scope, authentication) {
  $scope.templates =
  [
  { url: 'login.html' },
  { url: 'home.html' }
  ];
  $scope.template = $scope.templates[0];
  $scope.login = function (username, password) {
    if ( username === 'admin' && password === '1234') {
      authentication.isAuthenticated = true;
      $scope.template = $scope.templates[1];
      $scope.user = username;
    } else {
      $scope.loginError = "Invalid username/password combination";
    };
  };
  
});

animateApp.controller('HomeCtrl', function($scope, authentication) {
  $scope.user = authentication.user.name;
});

animateApp.factory('authentication', function() {
  return {
    isAuthenticated: false,
    user: null
  }
});

//var app = angular.module('loginApp', ['ngRoute']);

/*app.config(function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginCtrl'
  });
  $routeProvider.when('/home', {
    templateUrl: 'home.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.otherwise({ redirectTo: '/login' });
});
app.run(function(authentication, $rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function(evt) {
    if(!authentication.isAuthenticated){ 
      $location.url("/login");
    }
    evt.preventDefault();
  });
})*/
