const { model } = require('mongoose');
const nodemailer = require('nodemailer');
const { email, password } = require('./secrets/links');

module.exports = async function sendMail(user) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: email, // generated ethereal user
            pass: password, // generated ethereal password
        },
    });
    
    let clientEmail = user.email;

    let mailOptions = {
        from : `"Food App"${email}`,
        to : `${clientEmail}`,
        subject: "testing",
        text: "amazing😉",
        html: "<h1> Hii welcome to a new World " 
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            console.log('sucess');
        }
    });
};