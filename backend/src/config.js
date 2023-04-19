const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
const mongoDbConnectionString = process.env.MONGO_DB_CONNECTION_STRING;
module.exports = {
    jwtPrivateKey,
    mongoDbConnectionString
};