// controllers/convertHandler.js

function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    let num = input.match(/[.\d\/]+/g) || ["1"];
    if (num.length > 1) {
      if (num[0].includes('/') && num[1].includes('/')) {
        return "invalid number";
      }
    }
    try {
      result = eval(num[0]);
    } catch (e) {
      return "invalid number";
    }
    if (num[0].split('/').length > 2) {
      return "invalid number";
    }
    return result;
  };

  this.getUnit = function(input) {
    let result;
    result = input.match(/[a-zA-Z]+/g)[0];
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (!validUnits.includes(result.toLowerCase())) {
      return "invalid unit";
    }
    return result.toLowerCase() === "l" ? "L" : result.toLowerCase();
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      "gal": "L",
      "l": "gal",
      "mi": "km",
      "km": "mi",
      "lbs": "kg",
      "kg": "lbs"
    };
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      "gal": "gallons",
      "l": "liters",
      "mi": "miles",
      "km": "kilometers",
      "lbs": "pounds",
      "kg": "kilograms"
    };
    return spellOutMap[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      "gal": 3.78541,
      "l": 1 / 3.78541,
      "mi": 1.60934,
      "km": 1 / 1.60934,
      "lbs": 0.453592,
      "kg": 1 / 0.453592
    };
    let result = initNum * conversionRates[initUnit.toLowerCase()];
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
