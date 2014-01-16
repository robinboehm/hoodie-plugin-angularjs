describe('hoodieProvider', function () {
  beforeEach(module('hoodie'));

  it('should throw error if no url set', inject(function (HOODIE_ERROR_URL) {
    expect(function () {
      inject(function (hoodie) {
      });
    }).toThrow(HOODIE_ERROR_URL);
  }));

  it('should return hoodie with correct url if url set via provider', function () {
    module('hoodie', function (hoodieProvider) {
      hoodieProvider.url('myhood.com');
    });
    window.Hoodie = jasmine.createSpy('Hoodie');
    inject(function (hoodie) {
      expect(Hoodie).toHaveBeenCalledWith('myhood.com');
      expect(hoodie instanceof Hoodie).toBe(true);
    });
  });
});
