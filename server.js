require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes/apiRoutes');
const viewRouter = require('./routes/viewRoutes');
const app = express();
const ejs = require('ejs');
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/api', apiRouter); // router to handle "/api" routes.
app.use('/', viewRouter); // router to handle "/api" routes.
app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
