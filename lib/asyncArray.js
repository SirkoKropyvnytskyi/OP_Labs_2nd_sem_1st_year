export function asyncFilterMap(array, asyncCallback, options = {}) {
  const { signal } = options;

  return new Promise(async (resolve, reject) => {
    if (signal?.aborted) return reject(new Error('Aborted'));

    const results = [];
    for (let i = 0; i < array.length; i++) {
      if (signal?.aborted) return reject(new Error('Aborted'));
      const result = await asyncCallback(array[i], i);
      if (result !== undefined) {
        results.push(result);
      }
    }

    resolve(results);
  });
}

export function asyncFilterMapCallback(array, asyncCallback, callback, options = {}) {
  const { signal } = options;

  (async () => {
    try {
      const result = await asyncFilterMap(array, asyncCallback, { signal });
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  })();
}