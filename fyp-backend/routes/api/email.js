const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true, 
  auth: {
    user: "myservicexssuport@gmail.com",
   // pass: "XsSupportServicePakistan"
   pass:"kprtcqhlgemquqis"
  },
});

module.exports = function sendEmail(to, subject, text) {
  var mailOptions = {
    from: "myservicexssuport@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };
  console.log("In sendEMail", mailOptions);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};
