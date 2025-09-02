// asyncHandler.js
const ah = (fn) => (req, res, next) => {
   Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { ah };
