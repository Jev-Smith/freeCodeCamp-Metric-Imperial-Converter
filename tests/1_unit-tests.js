const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

function convert(input) {
    const result = convertHandler.
        convert(convertHandler.getNum(input), convertHandler.getUnit(input));
    return result;
}

suite('Unit Tests', function () {
    suite('Convert Handler', function () {
        let result;

        test('Handle Whole Numbers', function () {
            result = convert('3kg');
            assert.equal(result.initNum, 3);
        })

        test('Handle Decimal Numbers', function () {
            result = convert('2.1kg');
            assert.equal(result.initNum, 2.1);
        })

        test('Handle Fractional Numbers', function () {
            result = convert('1/2km');
            assert.equal(result.initNum, 0.5);
        })

        test('Handle Fractional Numbers with Decimal', function () {
            result = convert('1.5/2km');
            assert.equal(result.initNum, 0.75);
        })

        test('Return an Error for Double Fractions', function () {
            result = convert('2/2/2lbs');
            assert.equal(result, 'invalid number');
        })

        test('Default to 1', function () {
            result = convert('gal');
            assert.equal(result.initNum, 1);
        })

        test('Read Valid Input Unit', function () {
            result = convert('2gal');
            assert.equal(result.initUnit, 'gal');
        })

        test('Handle Invalid Input Unit', function () {
            result = convert('2s');
            assert.equal(result, 'invalid unit');
        })

        test('Return Correct Return Unit', function () {
            result = convert('2mi');
            assert.equal(result.returnUnit, 'km');
        })

        test('Return Correct Spelled-Out String Unit', function () {
            result = convertHandler.spellOutUnit('mi');
            assert.equal(result, 'miles');
        })

        test('Convert "gal" to "L"', function () {
            result = convert('gal');
            assert.equal(result.returnUnit, 'L');
        })

        test('Convert "L" to "gal"', function () {
            result = convert('L');
            assert.equal(result.returnUnit, 'gal');
        })

        test('Convert "mi" to "km"', function () {
            result = convert('mi');
            assert.equal(result.returnUnit, 'km');
        })

        test('Convert "km" to "mi"', function () {
            result = convert('km');
            assert.equal(result.returnUnit, 'mi');
        })

        test('Convert "lbs" to "kg"', function () {
            result = convert('lbs');
            assert.equal(result.returnUnit, 'kg');
        })

        test('Convert "kg" to "lbs"', function () {
            result = convert('kg');
            assert.equal(result.returnUnit, 'lbs');
        })
    })
});