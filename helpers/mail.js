import { devConfig } from "../env";

const nodemailer = require("nodemailer");
const htmlToText = require('html-to-text');

export const sendEmail = (options) => {
    return new Promise((resolve, reject) => {
        const transpoter = nodemailer.createTransport({
            host: devConfig.ethereal.host,
            port: devConfig.ethereal.port,
            auth: {
                user: devConfig.ethereal.username,
                pass: devConfig.ethereal.password
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
