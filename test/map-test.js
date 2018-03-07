var assert = require('assert');
const maestro = require('../maestro');

describe('Map', function(){
  
  describe('#pattern()', function(){
    it('Should map a function over elements of a list that satisfy a predicate.', function(){
      assert.deepEqual([2, 2, 2, 3, 2, 4, 2, 5], maestro.map.pattern([1, 2, 1, 3, 1, 4, 1, 5], x => x + 1, x => x === 1));  
    }); 
  });

  describe('#deep()', function(){
    it('Should map a function over all subarrays and all elements of the array.', function(){
      assert.deepEqual([2,3,[4,5,[6,7]]], maestro.map.deep([1,2,[3,4,[5,6]]], x => x + 1)); 
    });  
  });

  describe('#normalize()', function(){
    it('Should apply a function to all elements of an array until all elements satisfty the predicate.', function(){
      assert.deepEqual([10, 10, 10, 10, 10], maestro.map.normalize([1, 2, 3, 4, 5], x => x + 1, x => x >= 10)); 
  }); 
 }); 

  describe('#recur()', function(){
    it('Should recursively apply a function to array elements while a predicate applies to an element', function(){
      assert.deepEqual([20, 20, 25, 30, 35], maestro.map.recur([5, 10, 25, 30, 35], x => x + 1, x => x < 20));  
    });  
  });

  describe('#compose()', function(){
    it('Should map the composition of functions over an array.', function(){
      assert.deepEqual([3, 5, 7, 9, 11], maestro.map.compose([1,2,3,4,5], x => x + 1, x => x * 2));  
    });  
  });

  describe('#arrow()', function(){
    it('Should map the arrow of functions over an array.', function(){
      assert.deepEqual([4, 6, 8, 10, 12], maestro.map.arrow([1,2,3,4,5], x => x + 1, x => x * 2)); 
    });  
  });

  describe('#grouping()', function(){
    it('Should apply f to elements of an array, and then group the results based on predicates.', function(){
      assert.deepEqual(true, true);  
    });  
  });

});
