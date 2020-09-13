const passport = require('passport');
const PassportJWT = require('passport-jwt');
const { devConfig } = require('../env');
const User = require('../models/user');

export const configureJWTStrategy = () => {
    var opts = {};
    opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = devConfig.jwtSecret;

    passport.use(new PassportJWT.Strategy(opts, function(payload, done) {
        User.findOne({ _id: payload._id }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}