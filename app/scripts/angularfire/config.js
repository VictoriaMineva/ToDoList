angular.module('firebase.config', [])
  .constant('FBURL', 'https://victoria-todolist.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook'])

  .constant('loginRedirectPath', '/login');
