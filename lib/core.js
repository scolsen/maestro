/*Maestro Core*/
const reducer = require('./reducer');

function id (x) { return x }

function memoize (x) {return function (y) {return x}} 

function map (array, f){
  return array.map(x => f(x));
}

function compose (...functions){
  functions = reducer.flat(functions);
  return functions.reduce((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

function arrow (...functions){
  functions = reducer.flat(functions);
  return functions.reduceRight((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

function decons (structure, functor, base, lift, lower, predicate = memoize(false)) {
  let inner = x => {
    if(predicate(x)) return lift(x, decons(x, functor, base, lift, lower, predicate));
    return lift(x, lower(structure, x));
  }  
  return functor(structure, inner);
}

exports.id = id;
exports.memoize = memoize;
exports.map = map;
exports.compose = compose;
exports.arrow = arrow;
exports.decons = decons;
