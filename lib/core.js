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
