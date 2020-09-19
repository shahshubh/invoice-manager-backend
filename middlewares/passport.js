const passport = require('passport');
const PassportJWT = require('passport-jwt');
const User = require('../models/user');

exports.configureJWTStrategy = () => {
    var opts = {};
    opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.jwtSecret;

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