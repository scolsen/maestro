# Map Functions

Tarski provides the following map functions:

`partitionMap(array :: Array, f :: Function, predicate :: Function)`: The partition map function takes an array, a function, and a predicate. The provided array is partitioned based on the provided predicate using [partition](), then the provided function argument f is mapped over the first element of the partition.


