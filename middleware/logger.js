/**
 * Custom Logger Middleware
 * Logs HTTP Method, Request URL, and Timestamp for every incoming request
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;

  console.log(`[${timestamp}] ${method} ${url}`);
  next();
};

module.exports = logger;
