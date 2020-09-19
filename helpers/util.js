const jwt = require('jsonwebtoken');
exports.getJWTToken = payload => {
    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
    return token;
};

