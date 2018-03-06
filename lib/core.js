exports.id = function (x) { return x }

exports.map = function (array, f){
  return array.map(x => f(x));
}

exports.composeRight = function (...functions){
  functions = flatOf(functions);
  return functions.reduce((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

exports.composeLeft function (...functions){
  functions = flatOf(functions);
  return functions.reduceRight((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

exports.memoize = function (x) {return function (y) {return x}} 

// where g of x lifts x into structure.
// where f of structure is unit [], {}. 
// where h of structure is a functor, map, reduce, filter, etc.
// where z of x is a lift down from (structure x) -> x

exports.decons = function (structure, predicate = memoize(false), m, f, g, h, z) {
  let inner = x => {
    if(predicate(x)) return g(f(), x, decons());
    return g(f(), x, z(structure, x));
  }  
  return m(structure, inner);
}
