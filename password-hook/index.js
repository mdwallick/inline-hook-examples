exports.handler = async(event) => {
  console.log("RAW event");
  console.log(event);
  let user_password = event.data.context.credential.password;
  let valid_password = "letmeinplease!@#";
  let result = "UNVERIFIED";

  if (user_password === valid_password) {
    result = "VERIFIED";
  }

  console.log("Password is " + result);
  let response = {
    "commands": [{
      "type": "com.okta.action.update",
      "value": {
        "credential": result
      }
    }]
  };
  return response;
};
