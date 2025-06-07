export function numberIterator() {
  let i = 1;
  return {
    next: () => ({ value: i++, done: false })
  };
}

export function timeoutIterator(intervalMs, timeoutSec, iterator) {
  const startTime = Date.now();

  const timer = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed >= timeoutSec) {
      clearInterval(timer);
      console.log("Timeout reached.");
      return;
    }

    const next = iterator.next();
    if (next.done) {
      clearInterval(timer);
      console.log("Iterator exhausted.");
      return;
    }

    console.log("->", next.value);
  }, intervalMs);
}