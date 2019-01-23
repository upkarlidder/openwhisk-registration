const twilio = require('twilio');

function main(params) {

  return new Promise(function (resolve, reject) {
    const client = twilio(params.accountSid, params.authToken);
    client.messages
      .create({
        body: 'Welcome to the openwhisk class at forwardJS',
        from: params.twilio_phone,
        to: params.user_phone
      }).then(message => {
        console.log(message.sid)
        console.log(`sent message from ${params.twilio_phone} to ${params.user_phone}`)
        resolve({ result: message.sid });
      }).catch(e => {
        console.log(e.message);
        reject({ result: e.message });
      });
  });

}

exports.main = main