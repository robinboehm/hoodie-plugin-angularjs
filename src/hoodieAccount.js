'use strict';

angular.module('hoodie').service('hoodieAccount', ['$rootScope', 'hoodie', '$q',
  function ($rootScope, hoodie, $q) {
    var service = this;

    //Wrap hoodie fns to turn hoodie promises into angular
    angular.forEach([
      'signUp',
      'signIn',
      'signOut',
      'changePassword',
      'changeUsername',
      'resetPassword',
      'destroy'
    ], function (fnName) {
      service[fnName] = function () {
        return $q.when(hoodie.store[fnName](arguments));
      };
    });

    // listen for account events
    angular.forEach([
      // user has signed up (this also triggers the authenticated event, see below)
      'signup',
      // user has signed in (this also triggers the authenticated event, see below)
      'signin',
      // user has signed out
      'signout',
      // user has re-authenticated after their session timed out
      // (this does _not_ trigger the signin event)
      'authenticated',
      // user's session has timed out. This means the user is still signed in locally,
      // but Hoodie cannot sync remotely, so the user must sign in again
      'unauthenticated'
    ], function (eventName) {
      hoodie.on(eventName, function (eventData) {
        $rootScope.$apply(function () {
          $rootScope.$emit('hoodie:' + eventName, eventData);
          service.username = eventData;
        });
      });
    });

    this.username = hoodie.account.username;
  }]);
