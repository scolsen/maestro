const core = require('./core');

exports.pattern = function (array, f, predicate){
  return array.map(x => {
    if(predicate(x)) return f(x);
    return x;
  });
}

exports.deep = function (array, f){
  return array.map(x => {
    if(Array.isArray(x)) return deepMap(x, f);
    return f(x);
  });
}

exports.normalize = function (array, f, predicate){
  let recur = function(x){ if(predicate(x)) return x; return recur(f(x)); }
  return array.map(x => recur(x));
}

exports.recur = function (array, f, predicate){
  return array.map(x => {
    if(predicate(x)) return recurMap(array, f, predicate);
    return f(x);
  });
}

exports.filter = function (array, f, ...predicates){
  let ps = reducer.flat(predicates);
  return ps.map(p => array.filter(y => p(y)));
}

exports.composel = function (array, ...functions){
  return array.map(composeLeft(functions));
}

exports.composer = function (array, ...functions){
  return array.map(composeRight(functions));
}
