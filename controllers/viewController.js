const { readdirSync, readFileSync, existsSync } = require('fs');
const path = require('path');
const AppError = require('../utils/AppError');
const tryCatchWrap = require('../utils/tryCatchWrap');

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
    if (req.method === 'GET') return res.status(200).render('create', {});
});

module.exports = { renderHome, viewFile, createFile };
