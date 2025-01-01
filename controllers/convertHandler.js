function ConvertHandler() {
  this.numberErrorMessage = 'invalid number';
  this.unitErrorMessage = 'invalid unit';
  this.inputErrorMessage = 'invalid number and unit';

  this.getIndex = function (input) {
    const unit = this.getUnit(input);

    if (unit === null) {
      return null;
    }

    const index = input.indexOf(unit);
    return index;
  }

  this.getNum = function (input) {
    const result = input.match(/\d+((\.*\d+)?(\/*\d+)?(\.*\d+)?)*/g) || '1';

    if (result === '1') {
      return result;
    }

    const invalidNumberFormatCheck = result[0].match(/\//g) ||
      result[0].match(/\./g) || [];

    const notValidNumber = invalidNumberFormatCheck.length >= 2 ||
      result.length >= 2 ? true : false;

    if (notValidNumber) {
      //May need to change line below
      return this.numberErrorMessage;
    }

    const num = result[0];
    return num;
  };

  this.getUnit = function (input) {
    const arr = input.match(/[A-za-z]+/gi) || null;

    if (arr === null) {
      //May need to change line below
      return this.unitErrorMessage;
    }
    else {
      arr[0] = arr[0].toLowerCase();

      switch (arr[0]) {
        case 'l':
          arr[0] = 'L';
          break;
        case 'gal':
          break;
        case 'kg':
          break;
        case 'lbs':
          break;
        case 'mi':
          break;
        case 'km':
          break;
        default:
          arr[0] = this.unitErrorMessage;
      }
    }

    if (arr[0] === this.unitErrorMessage) {
      return arr[0];
    }

    const unit = arr[0];
    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    const unit = this.getUnit(initUnit);

    switch (unit) {
      case 'L':
        result = 'gal';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'L':
        unit = 'litres';
        break;
      case 'gal':
        unit = 'gallons';
        break;
      case 'kg':
        unit = 'kilograms';
        break;
      case 'lbs':
        unit = 'pounds';
        break;
      case 'mi':
        unit = 'miles';
        break;
      case 'km':
        unit = 'kilometers';
        break;
    }

    return unit;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const litresToGal = 0.264172;
    const lbsToKg = 0.453592;
    const kgToLbs = 2.2046244202;
    const miToKm = 1.60934;
    const kmToMi = 0.6213725;
    let returnNum;

    if (initNum === this.numberErrorMessage && initUnit !== this.unitErrorMessage) {
      return initNum;
    }
    else if (initUnit === this.unitErrorMessage && initNum !== this.numberErrorMessage) {
      return initUnit;
    }
    else if (initNum === this.numberErrorMessage && initUnit === this.unitErrorMessage) {
      return this.inputErrorMessage;
    }

    initNum = Number(eval?.(`"use strict";(${initNum})`));

    switch (initUnit) {
      case 'L':
        result = initNum * litresToGal;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'kg':
        result = initNum * kgToLbs;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum * kmToMi;
        break;
    }

    returnNum = Number(result.toFixed(5));

    const returnUnit = this.getReturnUnit(initUnit);
    const spellOutInitUnit = this.spellOutUnit(initUnit);
    const spellOutReturnUnit = this.spellOutUnit(returnUnit);

    const obj = {
      initNum,
      initUnit,
      returnNum,
      returnUnit
    }

    obj.string = this.getString(obj.initNum, spellOutInitUnit,
      obj.returnNum, spellOutReturnUnit);

    return obj;
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

    return result;
  };

}

module.exports = ConvertHandler;
