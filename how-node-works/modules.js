// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const Calc = require('./calc-module-1');
const calc1 = new Calc();
console.log(calc1.add(2, 5));
console.log(calc1.divide(5, 2));

// exports
const {add, multiply} = require('./calc-module-2');
console.log(add(1,2));
console.log(multiply(2,7));

// caching
require('./test-module-1')();
require('./test-module-1')();
require('./test-module-1')();
