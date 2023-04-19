const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const protectRoute = require('./middlewares/auth.middleware.js');
const JSendResponse = require('./utils/jsend-response.js').JSendResponse;
var cors = require('cors');
const { mongoDbConnectionString } = require('./config.js');


// Connect to MongoDB
mongoose.connect(mongoDbConnectionString, { dbName: 'projectFinder' })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Use middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({
    origin: '*',
}));

// Define routes

// Public routes
app.get('/api/v1/health', (req, res) => {
    res.send(new JSendResponse().success(data = undefined, message = 'Server is healthy'));
});
app.use('/', require('./routes/auth.route.js'));

// Protect all routes after this middleware
app.use(protectRoute);
app.use('/api/v1/', require('./routes/profile.route.js'));
app.use('/api/v1/ideas', require('./routes/ideas.route.js'));
app.use('/api/v1', require('./routes/gig.route.js'));
app.use('/api/v1/application', require('./routes/application.route.js'));

// Global error handler middleware
app.use((err, _, res, next) => {
    try {
        res.status(err.statusCode).json(new JSendResponse().fail(err.message, err.stack));
    }
    catch (e) {
        console.error(err.stack);
        res.status(500).json(new JSendResponse().error("Internal server error", err.stack));
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
