const express = require('express');
const passport = require('passport');
const { login, signup, test } = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/test', passport.authenticate('jwt', { session: false }), test);

module.exports = userRouter;