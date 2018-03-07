const core = require('./core');

function pattern (array, f, predicate){
  return array.map(x => {
    if(predicate(x)) return f(x);
    return x;
  });
}

function deep (array, f){
  return array.map(x => {
    if(Array.isArray(x)) return deep(x, f);
    return f(x);
  });
}

function normalize (array, f, predicate){
  let recur = function(x){ if(predicate(x)) return x; return recur(f(x)); }
  return array.map(x => recur(x));
}

function recur (array, f, predicate){
  let r = x => {
    if(predicate(x)) return r(f(x));
    return x;
  } 
  return array.map(x => {
    return r(x);
  });
}

function compose (array, ...functions){
  return array.map(core.compose(functions));
}

function arrow (array, ...functions){
  return array.map(core.arrow(functions));
}

function grouping(){}

exports.pattern = pattern;
exports.deep = deep;
exports.normalize = normalize;
exports.recur = recur;
exports.compose = compose;
exports.arrow = arrow;
