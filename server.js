require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes/apiRoutes');
const viewRouter = require('./routes/viewRoutes');
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.use('/api', apiRouter); // router to handle "/api" routes.
app.use('/', viewRouter); // router to handle "/api" routes.

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
