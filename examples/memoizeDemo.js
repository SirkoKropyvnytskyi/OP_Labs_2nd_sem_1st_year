import { memoize } from "../lib/memoize.js";

const slowAdd = (a, b) => {
  console.log("Calculating...");
  return a + b;
};

const memoAdd = memoize(slowAdd, { maxSize: 3, strategy: "lru" });

console.log(memoAdd(1, 2)); // Calculating... 3
console.log(memoAdd(1, 2)); // From cache: 3
console.log(memoAdd(2, 3)); // Calculating...
console.log(memoAdd(4, 5)); // Calculating...
console.log(memoAdd(6, 7)); // Triggers LRU eviction
console.log(memoAdd(1, 2)); // Recalculates because (1,2) was evicted