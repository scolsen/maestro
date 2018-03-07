var assert = require('assert');
const maestro = require('../maestro');

describe('Reducer', function(){
  
  describe('#flat()', function(){
    it('Should flatten an array. Subarrays elements should be lifted into the top array.', function(){
      assert.deepEqual([1,2,3,4,5], maestro.reducer.flat([1,2,[3,4,[5]]]));  
    });  
  });

});
