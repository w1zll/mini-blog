// error.js
const notFound = (req, res) => {
   res.status(404).json({ message: 'Not found' });
};

const errorHandler = (err, _req, res, _next) => {
   console.error(err);
   const status = err.status || 500;
   res.status(status).json({ message: err.message || 'Server error' });
};

module.exports = { notFound, errorHandler };
