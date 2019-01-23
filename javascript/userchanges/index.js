var openwhisk = require('openwhisk');

function main(args) {

  console.log(args);
  var ow = openwhisk();

  return new Promise(function (resolve, reject) {
    var new_user_email_fired = false;
    var new_user_sms_fired = false;
    var promises = [];

    if (args.user_email) {
      const user_email_trigger_name = "new_user_email_trigger"
      const msg = { "user_email": args.user_email };
      var user_email_trigger_promise = ow.triggers.invoke({ name: user_email_trigger_name, params: msg });
      new_user_email_fired = true;
      promises.push(user_email_trigger_promise);
    }

    if (args.user_phone) {
      const user_sms_trigger_name = "new_user_sms_trigger"
      const msg = { user_phone: args.user_phone };
      var user_sms_trigger_promise = ow.triggers.invoke({ name: user_sms_trigger_name, params: msg });
      new_user_sms_fired = true;
      promises.push(user_sms_trigger_promise);
    }

    Promise.all(promises).then(function (values) {
      console.log(`values: ${JSON.stringify(values, null, 4)}`);
      resolve({
        new_user_email_fired: new_user_email_fired,
        new_user_sms_fired: new_user_sms_fired
      })
    }).catch(e => {
      console.log(e);
      reject({
        e: e,
        new_user_email_fired: new_user_email_fired,
        new_user_sms_fired: new_user_sms_fired
      });
    });
  });
}