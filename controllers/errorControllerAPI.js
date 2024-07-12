module.exports = (err, req, res, next) => {
    if (err.errno === -4058)
        // if the 'data' directory is missing.
        return sendErrorResponse(
            err,
            req,
            res,
            500,
            'Something wrong happened.'
        );
    if (err.errCode === 1)
        // file requested not found.
        return sendErrorResponse(err, req, res, err.statusCode, err.message);
    if (err.errCode === 2)
        return sendErrorResponse(err, req, res, err.statusCode, err.message);
    sendErrorResponse(err, req, res, 500, 'Something wrong happened.');
};

const sendErrorResponse = (err, req, res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'fail',
        statusCode,
        message: message || undefined,
        err,
    });
};
