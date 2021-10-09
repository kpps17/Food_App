const nodemailer = require('nodemailer');
const { email, password } = require('./secrets/links');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: email, // generated ethereal user
        pass: password, // generated ethereal password
    },
});

let mailOptions = {
    from : `${email}`,
    to : "",
    subject: "testing",
    text: "amazing😉"
};

transporter.sendMail(mailOptions, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log('sucess');
    }
});