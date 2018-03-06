// Maestro.js

/* Function Composition */

function id(x) { return x }

function composeRight(...functions){
  functions = flatOf(functions);
  return functions.reduce((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

function composeLeft(...functions){
  functions = flatOf(functions);
  return functions.reduceRight((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

/* Reducers */

var reducer = {}

reducer.flat = function (array){
  let flatr=function (acc, cur){
    if(Array.isArray(cur)) return acc.concat(cur.reduce(flatr, []));
    return acc.concat(cur);
  }
  
  return array.reduce(flatr, []);
}

/* Maps */

var map = {};

map.partition = function (array, f, predicate){
 let part = partition(array, predicate);
 part[0].map(f);
 return part;
}

map.pattern = function (array, f, predicate){
  return array.map(x => {
    if(predicate(x)) return f(x);
    return x;
  });
}

map.deep = function (array, f){
  return array.map(x => {
    if(Array.isArray(x)) return deepMap(x, f);
    return f(x);
  });
}

map.satisfy = function (array, f, predicate){
  let recur = function(x){ if(predicate(x)) return x; return recur(f(x)); }
  return array.map(x => recur(x));
}

map.recur = function (array, f, predicate){
  return array.map(x => {
    if(predicate(x)) return recurMap(array, f, predicate);
    return f(x);
  });
}

map.filter = function (array, f, ...predicates){
  let ps = reducer.flat(predicates);
  return ps.map(p => array.filter(y => p(y)));
}

map.composel = function (array, ...functions){
  return array.map(composeLeft(functions));
}

map.composer = function (array, ...functions){
  return array.map(composeRight(functions));
}

/* Array Segmentation */

var list = {};

list.partition = partition(array, predicate){
  let a = array.filter(x => predicate(x));
  let b = array.filter(x => !predicate(x));

  return [].concat([a], [b]);
}

list.group = function (array, ...predicates){
  predicates = flatOf(predicates);
  if(predicates.length === 0) return array;
  return predicates.map(pred => array.filter(x => pred(x)));
}

list.arrange = function (array, ...predicates){
  let firstp = predicates[0];
  let inv = array.filter(x =>  !firstp(x));
  
  return predicates.map((pred, ind, preds) => {
    if (ind === 0) return arr.filter(x => pred(x));
    let r = inv.filter(x => pred(x));
    inv = inv.filter(x => !pred(x);
    return r;
  });
}

// => [v, v', v'']
list.arrange.flat = function (array, ...predicates){
  reducer.flat(list.arrange(array, predicates));  
}

// => {k: []}
list.arrange.label = function (array, predicates, labels){
  list.label(list.arrange(array, predicates), labels);
}

list.label = function (arr, ...labels){
  let l = flatOf(labels); 
  let o = {unlabeled: []};

  arr.forEach((x, i) => {
    if (l[i] === undefined){
      o.unlabeled = o.unlabeled.concat(x);
    } else {
      o[l[i]] = x;
    }
  });
  
  if (o.unlabeled.length === 0) delete o.unlabeled;
  return o;
}


