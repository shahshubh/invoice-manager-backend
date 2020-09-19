const httpStatus = require('http-status-codes');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getJWTToken } = require('../helpers/util');
const { sendEmail } = require('../helpers/mail');
const { use } = require('passport');

exports.signup = async (req,res) => {
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

        const foundUser = await User.findOne({ email: email });
        if(foundUser){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Email is already registered.'
            })
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
        const token = jwt.sign({ _id: user._id }, process.env.jwtSecret);
        // { expiresIn: '1d' }

        return res.json({ success: true, token });
        

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}



exports.forgotPassword = async (req,res) => {
    try {
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const {email} = req.body;
        if(!email){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please fill all the fields'
            });
        }
        if(!emailRegex.test(email)){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please enter valid email address.'
            });
        }

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({
                err: 'User with that email does not exist.'
            });
        }
        const token = getJWTToken({ _id: user._id });

        const resetLink = `
        <h4>Click on the below link to reset the password for your Invoice Manager account. The link will expire in 1 hour.</h4>
        <a href='${process.env.frontendUrl}/reset-password/${token}'>Reset Password</a>
        `;
        const results = await sendEmail({
            html: resetLink,
            subject: 'Forgot Password',
            email: user.email
        });

        return res.json(results);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}


exports.resetPassword = async (req, res) => {
    try {
        let {password} = req.body;
        if(!password){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Password is required'
            });
        }
        const user = await User.findById(req.currentUser._id);

        user.password = password;
        await user.save();
        return res.json({ success: true });


    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}



exports.test = async (req,res) => {
    return res.json(req.currentUser);
}