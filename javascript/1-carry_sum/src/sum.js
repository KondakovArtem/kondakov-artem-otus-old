function sum(arg){
    let res = arg;
    function sumWithClosure(arg){
        if (arg){
            res += arg;
            return sumWithClosure;
        }
        return res;
    }
    return sumWithClosure;
}


module.exports = sum;