// tests/part1/cart-summary-test.js
const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const sum = require('./../src/sum');

describe('sum', function() {
    it('sum(undefined)() // undefined', function() {
        const res = sum(undefined)();
        expect(res).to.equal(undefined);
    });
    it('sum(1)() // 1', function() {
        const res = sum(1)();
        expect(res).to.equal(1);
    });
    it('sum(1)(2)(3)(4)()  // 10', function() {
        const res = sum(1)(2)(3)(4)();
        expect(res).to.equal(10);
    });
    it('sum(0)(5)(3)(8)(-2)() // 14', function() {
        const res = sum(0)(5)(3)(8)(-2)();
        expect(res).to.equal(14);
    });
    it('sum(1)(1)(1)(1)(1)(1)(1)() // 7', function() {
        const res = sum(1)(1)(1)(1)(1)(1)(1)();
        expect(res).to.equal(7);
    });

});

