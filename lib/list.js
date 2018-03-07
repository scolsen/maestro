const core = require('./core');
const reducer = require('./reducer');

function partition(array, predicate){
  let a = array.filter(x => predicate(x));
  let b = array.filter(x => !predicate(x));

  return [].concat([a], [b]);
}

function group (array, ...predicates){
  predicates = reducer.flat(predicates);
  if(predicates.length === 0) return array;
  return predicates.map(pred => array.filter(x => pred(x)));
}

function arrange (array, ...predicates){
  predicates = reducer.flat(predicates);
  let firstp = predicates[0];
  let inv = array.filter(x =>  !firstp(x));
  
  return predicates.map((pred, ind, preds) => {
    if (ind === 0) return array.filter(x => pred(x));
    let r = inv.filter(x => pred(x));
    inv = inv.filter(x => !pred(x));
    return r;
  });
}

function label(array, ...labels){
  labels = reducer.flat(labels); 
  let o = {unlabeled: []};

  array.forEach((x, i) => {
    if (labels[i] === undefined){
      o.unlabeled = o.unlabeled.concat(x);
    } else {
      o[labels[i]] = x;
    }
  });
  
  if (o.unlabeled.length === 0) delete o.unlabeled;
  return o;
}

function order (array, ...predicates){
  return reducer.flat(arrange(array, predicates));  
}

function codify (array, predicates, labels){
  return label(arrange(array, predicates), labels);
}

function categorize (array, predicates, labels){
  return label(group(array, predicates), labels);  
}

function empty (){
 return []; 
}

function lift (x, y){
  if(Array.isArray(x)) return x.concat(y);
  return empty().concat(y) 
}

function functor (ls, f){
  return ls.map(f);  
}

function lower (ls, elem){
  return ls[ls.indexOf(elem)]; 
}

function unlist (ls, liftf){
  return core.decons(ls, functor, empty, liftf, lower, x => Array.isArray(x));  
}

exports.partition = partition;
exports.group = group;
exports.arrange = arrange;
exports.label = label;
exports.order = order;
exports.codify = codify;
exports.categorize = categorize;
exports.empty = empty;
exports.lift = lift;
exports.functor = functor;
exports.lower = lower;
exports.unlist = unlist;
