const { readdirSync, readFileSync, existsSync, appendFileSync } = require('fs');
const path = require('path');
const AppError = require('../utils/AppError');
const tryCatchWrap = require('../utils/tryCatchWrap');
const { isValidFileName } = require('../utils/fileNameValidator');

const renderHome = (req, res, next) => {
    const files = readdirSync('./data', { recursive: true });
    res.render('index', {
        files,
    });
};

const viewFile = tryCatchWrap((req, res, next) => {
    const filePath = path.join('./data', req.params.filename);
    if (!existsSync(filePath)) throw new AppError('File not found.', 404, 1); // errCode 1 : means that the file is not found.
    let fileContent = readFileSync(filePath, { encoding: 'utf-8' });
    fileContent = fileContent.replace(/\n/g, '<br>'); // Replace newlines with <br>
    res.render('detail', {
        fileContent,
        fileName: req.params.filename,
        feedback: '',
    });
});

const createFile = tryCatchWrap((req, res, next) => {
    if (req.method === 'GET')
        return res
            .status(200)
            .render('create', { feedback: '', feedbackStatus: '' });
    const { fileName, fileContent } = req.body;
    if (!fileName || !fileContent)
        throw new AppError('Missing fields.', 400, 2); // errCode 2 : means that the request doesn't match the way it's intended to be.
    if (!isValidFileName(fileName))
        throw new AppError('Invalid file name.', 400, 2); // errCode 2 : means that the request doesn't match the way it's intended to be.
    const filePath = path.join('./data', fileName);
    appendFileSync(filePath, fileContent); // creates new file if it doesn't exist, if it exists, it appends the content to it.
    res.status(201).render('create', {
        feedback: 'File created successfully.',
        feedbackStatus: 'positive',
    });
});

module.exports = { renderHome, viewFile, createFile };
