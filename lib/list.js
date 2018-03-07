const reducer = require('./reducer');

exports.partition = partition(array, predicate){
  let a = array.filter(x => predicate(x));
  let b = array.filter(x => !predicate(x));

  return [].concat([a], [b]);
}

exports.group = function (array, ...predicates){
  predicates = flatOf(predicates);
  if(predicates.length === 0) return array;
  return predicates.map(pred => array.filter(x => pred(x)));
}

exports.arrange = function (array, ...predicates){
  let firstp = predicates[0];
  let inv = array.filter(x =>  !firstp(x));
  
  return predicates.map((pred, ind, preds) => {
    if (ind === 0) return arr.filter(x => pred(x));
    let r = inv.filter(x => pred(x));
    inv = inv.filter(x => !pred(x);
    return r;
  });
}

exports.arrange.flat = function (array, ...predicates){
  reducer.flat(list.arrange(array, predicates));  
}

exports.arrange.label = function (array, predicates, labels){
  list.label(list.arrange(array, predicates), labels);
}

exports.label = function (arr, ...labels){
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

function empty (){
 return []; 
}

function lift (x, y){
  return empty().concat(y) 
}

function functor (ls, f){
  return ls.map(f);  
}

function lower (ls, elem){
  return ls[ls.indexOf(elem)]; 
}

function delist (ls, liftf){
  decons(ls, functor, empty, liftf, lower, x => Array.isArray(x));  
}
