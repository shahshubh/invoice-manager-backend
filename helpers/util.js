const jwt = require('jsonwebtoken');
const { devConfig } = require('../env');


export const getJWTToken = payload => {
    const token = jwt.sign(payload, devConfig.jwtSecret, { expiresIn: "1hr" });
    return token;
};
