exports.id = function (x) { return x }

exports.map = function map (array, f){
  return array.map(x => f(x));
}

exports.composeRight = function (...functions){
  functions = flatOf(functions);
  return functions.reduce((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

exports.composeLeft = function (...functions){
  functions = flatOf(functions);
  return functions.reduceRight((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

exports.memoize = function (x) {return function (y) {return x}} 

function decons (structure, functor, base, lift, lower, predicate = memoize(false)) {
  let inner = x => {
    if(predicate(x)) return lift(x, decons(x, functor, base, lift, lower, predicate));
    return lift(x, lower(structure, x));
  }  
  return functor(structure, inner);
}

exports.decons = decons;
