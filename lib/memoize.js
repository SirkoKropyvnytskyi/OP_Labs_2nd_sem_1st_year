export function memoize(fn, options = {}) {
  const {
    maxSize = Infinity,
    strategy = 'none', // 'lru', 'lfu', 'ttl', 'custom'
    ttl = 0,
    customEvict = null,
  } = options;

  const cache = new Map();
  const usageCount = new Map();
  const timestamps = new Map();

  const evict = () => {
    if (strategy === 'lru') {
      const oldestKey = [...timestamps.entries()].sort((a, b) => a[1] - b[1])[0]?.[0];
      if (oldestKey) cache.delete(oldestKey);
    } else if (strategy === 'lfu') {
      const leastUsedKey = [...usageCount.entries()].sort((a, b) => a[1] - b[1])[0]?.[0];
      if (leastUsedKey) cache.delete(leastUsedKey);
    } else if (strategy === 'ttl') {
      const now = Date.now();
      for (const [key, time] of timestamps.entries()) {
        if (now - time > ttl) {
          cache.delete(key);
        }
      }
    } else if (strategy === 'custom' && typeof customEvict === 'function') {
      customEvict(cache);
    }
  };

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      usageCount.set(key, (usageCount.get(key) || 0) + 1);
      timestamps.set(key, Date.now());
      return cache.get(key);
    }

    const result = fn(...args);
    if (cache.size >= maxSize) evict();

    cache.set(key, result);
    usageCount.set(key, 1);
    timestamps.set(key, Date.now());

    return result;
  };
}
