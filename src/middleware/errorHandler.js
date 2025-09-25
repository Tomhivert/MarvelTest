const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const response = {
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString(),
  };

  res.status(500).json(response);
};

const notFoundHandler = (req, res) => {
  const response = {
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  };

  res.status(404).json(response);
};

module.exports = { errorHandler, notFoundHandler };
