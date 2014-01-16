'use strict';
angular.module('hoodie').provider('hoodie', ['HOODIE_ERROR_URL', function (HOODIE_ERROR_URL) {
  var hoodieUrl;
  this.url = function (url) {
    if (arguments.length) {
      hoodieUrl = url;
    }
    return url;
  };

  this.$get = function () {
    if (!hoodieUrl) {
      throw new Error(HOODIE_ERROR_URL);
    }
    return new Hoodie(hoodieUrl);
  };

}]);
