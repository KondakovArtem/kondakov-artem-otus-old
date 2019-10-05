const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const promiseReduce2 = require('./../src/promiseReduce').promiseReduce2;
const TestConsole = require("./testConsole");

describe('promiseReduce2', () => {

    it('test1', () => {
        const testConsole = new TestConsole();
        // first async function
        const fn1 = () => {
            testConsole.log('fn1');
            return Promise.resolve(2)
        };

        // second async function
        const fn2 = () => new Promise(resolve => {
            testConsole.log('fn2');
            setTimeout(() => resolve(3), 1000)
        });

        return promiseReduce2([fn1, fn2],
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
                    '6'
                ].join('\n'));
            })
    });


});
