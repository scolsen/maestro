var assert = require('assert');
const tarski = require('../tarski');

describe('List', function(){
  describe('#partition()', function(){
    it('Should split a list into two lists, based on running predicate and !predicate', function(){
      assert.deepEqual([[1, 2, 3, 4], [5, 6, 7, 8]], tarski.list.partition([1,2,3,4,5,6,7,8], x => x < 5)); 
    }); 
  });

  describe('#group()', function(){
    it('Should group elements into subarrays based on predicates', function(){
      assert.deepEqual([[1],[1,2,3],[4,5]], tarski.list.group([1,2,3,4,5], x => x === 1, x => x < 4, x => x > 3)); 
      assert.deepEqual([[1],[1,2,3],[4,5]], tarski.list.group([1,2,3,4,5], [x => x === 1, x => x < 4, x => x > 3]));
    }); 
  });

  describe('#arrange()', function(){
    it('Should group elements into subgroups based on predicates, without repeating elements in any subsequent grouping', function(){
      assert.deepEqual([[1,2],[3,4],[5]], tarski.list.arrange([3,4,1,2,5], x => x <= 2, x => x < 5, x => x < 10));  
      assert.deepEqual([[1,2],[3,4],[5]], tarski.list.arrange([3,4,1,2,5], [x => x <= 2, x => x < 5, x => x < 10]));
    }); 
  });

  describe('#label()', function(){
    it('Should label elements in an array sequentially and return an object', function(){
      assert.deepEqual({"Ones": [1,1,1], "Two": 2, "Three": 3}, tarski.list.label([[1,1,1], 2, 3], "Ones", "Two", "Three")); 
      assert.deepEqual({"Ones": [1,1,1], "Two": 2, "Three": 3}, tarski.list.label([[1,1,1], 2, 3], ["Ones", "Two", "Three"]));
    }); 
  });

  describe('#order()', function(){
    it('Should arrange elements and then flatten the result, producing a flat list of ordered elements.', function(){
      assert.deepEqual([1,2,3,4,5], tarski.list.order([3,4,5,1,2], x => x <= 2, x => x < 5, x => x < 10)); 
      assert.deepEqual([1,2,3,4,5], tarski.list.order([3,4,5,1,2], [x => x <= 2, x => x < 5, x => x < 10]));
    }); 
  });

  describe('#codify()', function(){
    it('Should arrange elements and label the arrangements.', function(){
      assert.deepEqual({"Less than two": [1,2], "Less than five": [3,4], "Less than ten": [5]}, tarski.list.codify([3,4,5,1,2], [x => x <= 2, x => x < 5, x => x < 10], ["Less than two", "Less than five", "Less than ten"])); 
    }); 
  });

  describe('#categorize()', function(){
    it('Should group elements and label the groups.', function(){
      assert.deepEqual({"Less than two": [1,2], "Less than five": [1,2,3,4], "Less than ten": [1,2,3,4,5]}, tarski.list.categorize([1,2,3,4,5], [x => x <= 2, x => x < 5, x => x < 10], ["Less than two", "Less than five", "Less than ten"])); 
    }); 
  });

  describe('#empty()', function(){
    it('Should return an empty array.', function(){
      assert.deepEqual([], tarski.list.empty()); 
    });   
  });

  describe('#lift()', function(){
    it('Should lift an element into an array structure via concatenation', function(){
      assert.deepEqual([2], tarski.list.lift('n', 2));
      assert.deepEqual([1,2,3], tarski.list.lift([1,2], 3));  
    }); 
  });

  describe('#functor()', function(){
    it('Should map a function over an array.', function(){
      assert.deepEqual([2,3,4,5,6], tarski.list.functor([1,2,3,4,5], x => x + 1));   
    }); 
  });
  
  describe('#lower()', function(){
    it('Should lower an array element out of an array structure.', function(){
      assert.equal(1, tarski.list.lower([1,2,3,4,5], 1));
    });  
  });

  describe('#unlist()', function(){
    it('Should separate elements of a list into component structures using a provided lifting function', function(){
     assert.deepEqual([[1],[2],[3],[4],[5]], tarski.list.unlist([1,2,3,4,5], tarski.list.lift)); 
    }); 
  });

});
