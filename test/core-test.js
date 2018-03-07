var assert  = require('assert');
const maestro = require('../maestro');

describe('Core', function(){
  
  describe('#id()', function(){
    it('Should return its argument.', function(){
      assert.deepEqual(1, maestro.core.id(1));   
    }); 
  });

  describe('#memoize()', function(){
    it('Should store an initial value and return a function that returns the inital value via closure.', function(){
      assert.equal("function", typeof maestro.core.memoize(1));
      assert.equal(1, maestro.core.memoize(1)());
    }); 
  });

  describe('#map()', function(){
    it('Should be a synonym for Array.prototype.map()', function(){
      assert.deepEqual([1, 2, 3, 4, 5].map(x => x + 1), maestro.core.map([1, 2, 3, 4, 5], x => x + 1)); 
    }); 
  });

  describe('#compose()', function(){
    it('Should return a function that is the composition of functions from the right.', function(){
      assert.equal("function", typeof maestro.core.compose(x => x + 1, x => x * 2));
      assert.equal(7 ,maestro.core.compose(x => x + 1, x => x * 2)(3)); 
      assert.equal(7 ,maestro.core.compose([x => x + 1, x => x * 2])(3)); 
    });   
  });

  describe('#arrow()', function(){
    it('Should return a function that is the composition of functions from the left.', function(){
      assert.equal("function", typeof maestro.core.arrow(x => x + 1, x => x * 2));
      assert.equal(8, maestro.core.arrow(x => x + 1, x => x * 2)(3)); 
      assert.equal(8, maestro.core.arrow([x => x + 1, x => x * 2])(3)); 
    }); 
  });

  describe('#decons()', function(){
    it('Should deconstruct a structure using lifts, lowers, functors, predicates, and a base.', function(){
      assert.deepEqual([[1],[2],[3],[4],[5]], maestro.core.decons([1,2,3,4,5], maestro.list.functor, maestro.list.empty, maestro.list.lift, maestro.list.lower));
      assert.deepEqual([1,2,3,4,5], maestro.core.decons([1,2,3,4,5], maestro.list.functor, maestro.list.empty, maestro.core.id, maestro.list.lower));
    }); 
  });
});
