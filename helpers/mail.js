const nodemailer = require("nodemailer");
const htmlToText = require('html-to-text');

exports.sendEmail = (options) => {
    return new Promise((resolve, reject) => {
        const transpoter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.smtpUsername,
                pass: process.env.smtpPassword
            }
        });

        const text = htmlToText.fromString(options.html, {
            wordwrap: 130,
        });
        const mailOptions = {
            from: '"Shubh Shah" <noreply@invoicemanager.com>',
            to: options.email,
            subject: options.subject,
            text: text,
            html: options.html,
        };
        transpoter.sendMail(mailOptions, (error, info) => {
            if(error){
                return reject(error);
            }
            // console.log(info);
            // console.log("Preview url ", nodemailer.getTestMessageUrl(info));
            return resolve({ message: 'Reset mail has been sent to your email' });
        })
    });
}
