const express = require('express');
const {
    renderHome,
    viewFile,
    createFile,
} = require('../controllers/viewController');
const errorController = require('../controllers/errorController');

const viewRouter = express.Router();

viewRouter.route('/').get(renderHome);
viewRouter.route('/create').get(createFile).post(createFile);
viewRouter.route('/files/:filename').get(viewFile);

viewRouter.use(errorController);

module.exports = viewRouter;
