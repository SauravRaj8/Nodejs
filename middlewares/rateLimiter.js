const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 60*1000,
    max: 5,
    message: "Too many requests, so try again later.",
    skip: (req) => {
        return req.originalUrl.startsWith('/api-docs') || req.originalUrl.startsWith('/swagger');
    }
})