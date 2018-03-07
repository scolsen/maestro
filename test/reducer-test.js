var assert = require('assert');
const tarski = require('../tarski');

describe('Reducer', function(){
  
  describe('#flat()', function(){
    it('Should flatten an array. Subarrays elements should be lifted into the top array.', function(){
      assert.deepEqual([1,2,3,4,5], tarski.reducer.flat([1,2,[3,4,[5]]]));  
    });  
  });

});
