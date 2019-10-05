// "Simple" realization
async function promiseReduce(asyncFunctions, reduce, initialValue) {
    let res = initialValue;
    for (let asyncFunction of asyncFunctions) {
        res = reduce(res, await asyncFunction());
    }
    return res;
}

// "Reduce" realization
async function promiseReduce2(asyncFunctions, reduce, initialValue) {
    return await asyncFunctions.reduce(async (memoPromise, asyncFunction) => {
        const memo = await memoPromise;
        const value  = await asyncFunction();
        return reduce(memo, value);
    }, Promise.resolve(initialValue));
}

//module.exports = promiseReduce;
module.exports = {
    promiseReduce,
    promiseReduce2
};



