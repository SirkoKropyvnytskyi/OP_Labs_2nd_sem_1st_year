export function loggerDecorator(fn, options = {}) {
  const {
    level = 'INFO',
    logToConsole = true,
    logErrorsOnly = false,
  } = options;

  const isAsync = fn.constructor.name === 'AsyncFunction';

  const logWrapper = async (...args) => {
    const start = performance.now();
    try {
      const result = isAsync ? await fn(...args) : fn(...args);
      const end = performance.now();

      if (!logErrorsOnly && (level === 'INFO' || level === 'DEBUG')) {
        const logEntry = {
          timestamp: new Date().toISOString(),
          level,
          function: fn.name || 'anonymous',
          arguments: args,
          result,
          executionTime: +(end - start).toFixed(2),
        };

        const logMessage = JSON.stringify(logEntry, null, 2);
        if (logToConsole) console.log(logMessage);
      }

      return result;
    } catch (error) {
      const end = performance.now();
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        function: fn.name || 'anonymous',
        arguments: args,
        error: error.message,
        executionTime: +(end - start).toFixed(2),
      };

      const logMessage = JSON.stringify(logEntry, null, 2);
      if (logToConsole) console.error(logMessage);

      throw error;
    }
  };

  return logWrapper;
}