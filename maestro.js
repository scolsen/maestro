// Maestro.js

/* Function Composition */

function id(x) { return x }

// Compose functions from the right. (rightermost argument is applied first).
function composeRight(...functions){
  functions = flatOf(functions);
  return functions.reduce((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

function composeLeft(...functions){
  functions = flatOf(functions);
  return functions.reduceRight((acc, cur) => function (x){ return acc(cur(x)) }, id);
}

// shortcut for arr.map(compose(fns))
function mapComposeL(array, ...functions){
  return array.map(composeLeft(functions));
}

function mapComposeR(array, ...functions){
  return array.map(composeRight(functions));
}

/* Reducers */

//Flatten an array of arbitarily nested arrays.
function flatOf(array){
  let flatr=function (acc, cur){
    if(Array.isArray(cur)) return acc.concat(cur.reduce(flatr, []));
    return acc.concat(cur);
  }
  
  return array.reduce(flatr, []);
}

/* Maps */

function partitionMap(array, f, predicate){
 let part = partition(array, predicate);
 part[0].map(f);
 return part;
}

function patternMap(array, f, predicate){
  return array.map(x => {
    if(predicate(x)) return f(x);
    return x;
  });
}

function deepMap(array, f){
  return array.map(x => {
    if(Array.isArray(x)) return deepMap(x, f);
    return f(x);
  });
}

//Recurrently apply f until all elments of a satsify p, i.e. p(element) === true.
function satisfiesMap(array, f, predicate){
  let recur = function(x){ if(predicate(x)) return x; return recur(f(x)); }
  return array.map(x => recur(x));
}

function recurMap(array, f, predicate){
  return array.map(x => {
    if(predicate(x)) return recurMap(array, f, predicate);
    return f(x);
  });
}

/* Array Segmentation */

// Split an array into two parts based on a predicate.
function partition(array, predicate){
  let a = array.filter(x => predicate(x));
  let b = array.filter(x => !predicate(x));

  return [].concat([a], [b]);
}

// Split an array into n parts based on n predicates.
function group(array, ...predicates){
  predicates = flatOf(predicates);
  if(predicates.length === 0) return array;
  return predicates.map(pred => array.filter(x => pred(x)));
}

// Split an array into n parts based n predicates with no overlap/intersection
// Run on the inverse of the last filter.
// If an element is captured in a prior grouping, it will not be included in subsequent groupings
// So the order of the predicate sequence matters, as in typical pattern matching, it is best to go from spcific or narrow matches to general or wide ones.
function arrange(array, ...predicates){
  let firstp = predicates[0];
  let inv = array.filter(x =>  !firstp(x));
  
  return predicates.map((pred, ind, preds) => {
    if (ind === 0) return arr.filter(x => pred(x));
    let r = inv.filter(x => pred(x));
    inv = inv.filter(x => !pred(x);
    return r;
  });
}


//Label each element of an array.
// Converts the array into an object with a single key:
// {label: [arr]} 
// If the length of labels != the length of arr, an additional parameter, unlabeled, captures 
// the remaining arrays.
function label(arr, ...labels){
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


