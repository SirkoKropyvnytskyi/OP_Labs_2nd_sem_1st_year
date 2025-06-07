import { loggerDecorator } from '../lib/loggerDecorator.js';

function add(a, b) {
  return a + b;
}

const loggedAdd = loggerDecorator(add, { level: 'INFO' });
loggedAdd(2, 3);

async function fetchData(url) {
  return `Fetched from ${url}`;
}

const loggedFetch = loggerDecorator(fetchData, { level: 'INFO' });

loggedFetch('https://example.com')
  .then(console.log)
  .catch(console.error);

function errorFunc() {
  throw new Error('Test error');
}

const loggedError = loggerDecorator(errorFunc, { level: 'ERROR' });

try {
  loggedError();
} catch (err) {}
