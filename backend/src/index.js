const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const JSendResponse = require('./utils/jsend-response.js').JSendResponse;
const AppError = require('./utils/app-error.js').AppError;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'projectFinder' })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Use middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

// Define routes
app.get('/api/v1/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', require('./routes/auth.route.js'));

// Global error handler middleware
app.use((err, _, res, next) => {
    try {
        res.status(err.statusCode).json(new JSendResponse().fail(err.message));
    }
    catch (e) {
        console.error(err.stack);
        res.status(500).json(new JSendResponse().error("Internal server error"));
    }
    next();
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


// Close the connection to MongoDB
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Disconnected from MongoDB');
        process.exit(0);
    });
});
