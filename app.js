require('dotenv').config();

const express = require('express');
const mongo = require('mongoose');
const swagger = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const auth = require('./routes/auth');
const horoscope = require('./routes/horoscope');
const rateLimit = require('./middlewares/rateLimiter');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(rateLimit);

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

app.use('/', auth);
app.use('/horoscope', horoscope);

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/horoscope";
mongo.connect(mongoUrl)
    .then(() => {
        console.log("Mongo database connected successfully....");
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.error(err));