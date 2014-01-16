describe('hoodieConstant', function () {
  beforeEach(module('hoodie'));

  it('should define HOODIE_ERROR_URL', inject(function (HOODIE_ERROR_URL) {
    expect(HOODIE_ERROR_URL).toBeDefined();
  }));

  it('should error if no url set', inject(function (HOODIE_ERROR_URL) {
    expect(HOODIE_ERROR_URL).toBe('No url for hoodie set! Please set the hoodie url using hoodieProvider. Example: \n  myApp.config(function(hoodieProvider) {\n    hoodieProvider.url(\'http://myapp.dev/_api\'); });  \n  });');
  }));

});
