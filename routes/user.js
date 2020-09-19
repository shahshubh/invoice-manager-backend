const express = require('express');
const passport = require('passport');
const { login, signup, test, forgotPassword, resetPassword } = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/forgot-password', forgotPassword);
userRouter.put('/reset-password', passport.authenticate('jwt', { session: false }), resetPassword);
// userRouter.post('/test', passport.authenticate('jwt', { session: false }), test);

module.exports = userRouter;