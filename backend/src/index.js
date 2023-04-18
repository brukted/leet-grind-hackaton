const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Use middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));


// Add security middleware
app.use((req, res, next) => {
    if (req.headers['x-api-key'] !== 'myapikey') {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
});

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Global error handler middleware
app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message, status: err.statusCode });
    } else {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
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
