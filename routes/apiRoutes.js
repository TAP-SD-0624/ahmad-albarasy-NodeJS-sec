const express = require('express');
const {
    listAllFiles,
    getFile,
    deleteFile,
    createFile,
    renameFile,
} = require('../controllers/apiController');
const errorController = require('../controllers/errorController');

const apiRouter = express.Router();

apiRouter.route('/files').get(listAllFiles);
apiRouter.route('/files/create').post(createFile);
apiRouter.route('/files/rename').patch(renameFile);
apiRouter.route('/files/:filename').get(getFile).delete(deleteFile);

apiRouter.use(errorController);

module.exports = apiRouter;
