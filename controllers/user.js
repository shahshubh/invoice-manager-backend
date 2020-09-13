const httpStatus = require('http-status-codes');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { devConfig } = require('../env');

exports.signup = async (req,res) => {
    try {
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const {email, password} = req.body;
        console.log(req.body);
        if(!email || !password){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please fill all the fields'
            });
        }
        if(!emailRegex.test(email)){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please enter valid email address.'
            });
        }
        const user = await User.create(req.body);
        return res.json({ success: true, message: "User created successfully" });

    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.login = async (req,res) => {
    try {
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please fill all the fields'
            });
        }
        if(!emailRegex.test(email)){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please enter valid email address.'
            });
        }

        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(httpStatus.BAD_REQUEST).json({ err: 'User with that email does not exist' });
        }
        const matched = await bcrypt.compare(password, user.password);
        if(!matched){
            return res.status(httpStatus.UNAUTHORIZED).json({ err: 'Email and Password do not match' });
        }
        const token = jwt.sign({ _id: user._id }, devConfig.jwtSecret, { expiresIn: '1d' });

        return res.json({ success: true, token });
        

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}



exports.test = async (req,res) => {
    return res.json(req.currentUser);
}