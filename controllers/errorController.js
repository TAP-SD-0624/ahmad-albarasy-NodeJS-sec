module.exports = (err, req, res, next) => {
    if (req.baseUrl.startsWith('/api')) return APIErrorHandler(err, req, res);
    else return ViewErrorHandler(err, req, res);
};

const ViewErrorHandler = (err, req, res, next) => {
    if (req.url.startsWith('/files') && err.errCode === 1)
        res.status(err.statusCode).render('detail', {
            fileContent: '',
            fileName: req.params.filename,
            feedback: err.message,
        });
    else if (req.url.startsWith('/files') && err.errCode === 2) {
        res.status(err.statusCode).render('create', {
            feedback: err.message,
            feedbackStatus: '',
        });
    }
};

const APIErrorHandler = (err, req, res, next) => {
    if (err.errno === -4058)
        // if the 'data' directory is missing.
        return sendAPIErrorResponse(
            err,
            req,
            res,
            500,
            'Something wrong happened.'
        );
    if (err.errCode === 1)
        // file requested not found.
        return sendAPIErrorResponse(err, req, res, err.statusCode, err.message);
    if (err.errCode === 2)
        return sendAPIErrorResponse(err, req, res, err.statusCode, err.message);
    sendAPIErrorResponse(err, req, res, 500, 'Something wrong happened.');
};

const sendAPIErrorResponse = (err, req, res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'fail',
        statusCode,
        message: message || undefined,
        err,
    });
};
