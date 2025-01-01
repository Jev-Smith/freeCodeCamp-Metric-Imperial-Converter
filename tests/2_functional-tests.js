const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    let response;

    test('Convert Valid Input', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                response = JSON.parse(res.text)
                assert.equal(`${response.returnNum}${response.returnUnit}`, '2.64172gal');
                done();
            });
    })

    test('Convert Invalid Input', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                response = JSON.parse(res.text);
                assert.equal(response, "invalid unit");
                done();
            });
    })

    test('Convert Invalid Number', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                response = JSON.parse(res.text);
                assert.equal(response, "invalid number");
                done();
            });
    })

    test('Convert Invalid Number and Unit', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                response = JSON.parse(res.text);
                assert.equal(response, "invalid number and unit");
                done();
            });
    })

    test('Convert with No Number', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                response = JSON.parse(res.text);
                assert.equal(`${response.returnNum}${response.returnUnit}`, "2.20462lbs");
                done();
            });
    })
});
