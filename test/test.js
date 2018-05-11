var assert = require('chai').assert;
const convert = require('../app.js');

describe('Temperature Conversion', function() {
  describe('celsiusToFahrenheit', function() {
    it('should convert -40 celsius to -40 fahrenheit', function(){
      assert.equal(-40, convert.celsiusToFahrenheit(-40));
    });
  });
  describe('fahrenheitToCelsius', function() {
    it('should convert -15 fahrenheit to 5 celsius', function(){
      assert.equal(-15, convert.fahrenheitToCelsius(5));
    });
  });
});
