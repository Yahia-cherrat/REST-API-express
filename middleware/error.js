// This middleware catches any errors passed to next(err) and sends a response
// with the appropriate status and error message

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ message: err.message });
}

module.exports = errorHandler;
