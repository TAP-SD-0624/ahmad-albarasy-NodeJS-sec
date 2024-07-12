const {
    readFileSync,
    appendFileSync,
    existsSync,
    renameSync,
    unlink,
    rename,
} = require('fs');
const treeCLI = require('tree-cli');
const path = require('path');
const { isValidFileName } = require('../utils/fileNameValidator');
const APIError = require('../utils/APIError');
const errorHandler = require('../utils/errorHandler');

const listAllFiles = errorHandler((req, res, next) => {
    treeCLI({ base: './data2', noreport: true }).then((tree) => {
        let emptyDir;
        if (tree.data.root.children.length === 0)
            emptyDir = "Data directory is empty.";
        res.status(200).json({ status: 'success', files: emptyDir || tree.data }); // display a message if no files exists in the 'data' directory.
    });
});

const getFile = errorHandler((req, res, next) => {
    const filePath = path.join('./data', req.params.filename);
    if (!existsSync(filePath)) throw new APIError('File not found', 404, 1); // errCode 1 : means that the file is not found.
    const fileContent = readFileSync(filePath, { encoding: 'utf-8' });
    res.status(200).send(fileContent); // send the response as text, not JSON format.
});

const deleteFile = errorHandler((req, res, next) => {
    const filePath = path.join('./data', req.params.filename);
    if (!existsSync(filePath)) throw new APIError('File not found', 404, 1); // errCode 1 : means that the file is not found.
    unlink(filePath, () => console.log(`${filePath} deleted successfully`));
    res.status(204).send(); // 204 'no content'.
});

const createFile = errorHandler((req, res, next) => {
    const { fileName, content } = req.body;
    if (!fileName || !content) {
        throw new APIError('Bad request', 400, 2); // errCode 2 : means that the request doesn't match the way it's intended to be.
    }
    if (!isValidFileName(fileName))
        throw new APIError('Invalid file name.', 400, 2);
    const filePath = path.join('./data', req.params.filename);
    appendFileSync(filePath, content); // creates new file if it doesn't exist, if it exists, it appends the content to it.
    res.status(201).json({
        status: 'success',
    });
});

const renameFile = errorHandler((req, res, next) => {
    const { oldName, newName } = req.body;
    if (!oldName || !newName)
        throw new APIError('Bad request', 400, 2);
    const oldPath = path.join('./data', oldName);
    const newPath = path.join('./data', newName);
    if (!existsSync(oldPath)) throw new APIError('File not found', 404, 1);
    if (! isValidFileName(newName))
        throw new APIError('Invalid new name for file.', 400, 2);
    renameSync(oldPath, newPath);
    res.status(200).json({
        status: 'success',
        oldName,
        newName
    });
});

module.exports = { listAllFiles, getFile, createFile, deleteFile, renameFile };
