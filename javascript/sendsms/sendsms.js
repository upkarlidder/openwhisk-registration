const twilio = require('twilio');

function main(params) {

  return new Promise(function (resolve, reject) {
    const client = twilio(params.accountSid, params.authToken);
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${(currentDate.getMonth() + 1)}/${currentDate.getFullYear()}`;
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    client.messages
      .create({
        body: `Welcome to the openwhisk class at forwardJS ${date} @${time}`,
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