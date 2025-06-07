import { asyncFilterMap, asyncFilterMapCallback } from '../lib/asyncArray.js';

const array = [1, 2, 3, 4, 5];

const controller = new AbortController();
const signal = controller.signal;

// Callback-версія
asyncFilterMapCallback(
  array,
  async (x) => (x % 2 === 0 ? x * 10 : undefined),
  (err, result) => {
    if (err) return console.error('Callback Error:', err.message);
    console.log('Callback Result:', result);
  },
  { signal }
);

// Promise + async/await
(async () => {
  try {
    const result = await asyncFilterMap(
      array,
      async (x) => (x > 2 ? x * 2 : undefined),
      { signal }
    );
    console.log('Promise Result:', result);
  } catch (err) {
    console.error('Promise Error:', err.message);
  }
})();

setTimeout(() => {
  controller.abort();
  console.log('Операцію скасовано через AbortController');
}, 10);