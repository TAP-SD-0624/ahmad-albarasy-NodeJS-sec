const express = require('express');
const {
    listAllFiles,
    getFile,
    deleteFile,
    createFile,
    renameFile,
} = require('../controllers/apiController');
const errorControllerAPI = require('../controllers/errorControllerAPI');

const apiRouter = express.Router();

apiRouter.route('/files').get(listAllFiles);
apiRouter.route('/files/create').post(createFile);
apiRouter.route('/files/rename').patch(renameFile);
apiRouter.route('/files/:filename').get(getFile).delete(deleteFile);

apiRouter.use(errorControllerAPI);

module.exports = apiRouter;
