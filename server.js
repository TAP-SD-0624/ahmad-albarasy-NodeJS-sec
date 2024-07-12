require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes/apiRoutes');
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', apiRouter); // router to handle /api routes.

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
