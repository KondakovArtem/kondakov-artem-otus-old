// tests/part1/cart-summary-tests.js
const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const promiseReduce = require('./../src/promiseReduce').promiseReduce;
const TestConsole = require("./testConsole");

describe('promiseReduce', function () {

    it('test1', () => {
        const testConsole = new TestConsole();
        // first async function
        const fn1 = () => {
            testConsole.log('fn1');
            return Promise.resolve(1)
        };

        // second async function
        const fn2 = () => new Promise(resolve => {
            testConsole.log('fn2');
            setTimeout(() => resolve(2), 1000)
        });

        return promiseReduce([fn1, fn2],
            function (memo, value) {
                testConsole.log('reduce');
                return memo * value;
            },
            1
        )
            .then(testConsole.log)
            .then(() => {
                const resultLog = testConsole.result();
                expect(resultLog).to.equal([
                    'fn1',
                    'reduce',
                    'fn2',
                    'reduce',
                    '2'
                ].join('\n'));
            })
    });
});


