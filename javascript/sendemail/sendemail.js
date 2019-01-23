const sgMail = require('@sendgrid/mail');

function main(params) {

  return new Promise(function (resolve, reject) {
    sgMail.setApiKey(params.sendgrid_token);
    const msg = {
      to: params.user_email,
      from: 'ulidder@us.ibm.com',
      subject: 'Thank you for joining forwardJS',
      text: 'This is a cool Exercise!',
      html: "<strong>This is a cool Exercise!</strong>"
    };

    sgMail.send(msg)
      .then(function (data) {
        console.log(`email sent to : ${params.user_email}`)
        resolve({ status: "OK" });
      }).catch(function (e) {
        console.log(e.message);
        reject({ status: e.message });
      });
  });

}

exports.main = main;