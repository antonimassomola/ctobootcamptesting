let convert = {}

convert.celsiusToFahrenheit = function(celsius) {
    return celsius * 9 / 5 + 32;
}

convert.fahrenheitToCelsius = function(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

module.exports = convert;