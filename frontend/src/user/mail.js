var nodemailer = require('nodemailer');
var id = require('./conf.json')
/*var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.gmx.com',
    port: 587,
    secure: true,
    auth: {
        user: id.user,
        pass: id.pass
    }
}));
*/
var transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 587,
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    debug: true,
    auth: {
        user: id.user,
        pass: id.pass
    }
});

var mailOptions = {
    from: id.user,
    to: "msnegi1997@gmail.com",//hsamee95@gmail.com, shaharyar.shaukat@tum.de, ge38maq@mytum.de, jonathan.kaleve@gmail.com", // list of receivers
    subject: "Auto generated mail do not reply.", // Subject line
    text: "Confirmation of the full funcitioning GMX mail.", // plain text body
    html: `<p><b>Hello,</b></p>
        <p>This is a test mail again sorry about the spam : )<br/></p>
        <iframe src="https://ibb.co/jMfGVDP" height="500" width="300"></iframe>`,
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
}); 