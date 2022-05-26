exports.handler = async(event) => {
  console.log("RAW event");
  console.log(event);
  console.log("Okta Request: Access Token\n");
  console.log(event.data.access);
  console.log("Okta Request: ID Token\n");
  console.log(event.data.identity);
  console.log("Okta Request: User\n");
  console.log(event.data.context.user);

  let risk_score = "LOW";

  const response = {
    "commands": [{
        "type": "com.okta.identity.patch",
        "value": [{
            "op": "add",
            "path": "/claims/SSN",
            "value": between(100, 999) + "-" + between(100, 999) + "-" + between(1000, 9999)
          },
          {
            "op": "add",
            "path": "/claims/account_number",
            "value": "F0" + between(1000, 9999) + "-" + between(1000, 9999)
          }
        ]
      },
      {
        "type": "com.okta.access.patch",
        "value": [{
          "op": "add",
          "path": "/claims/risk_score",
          "value": risk_score
        }]
      }
    ]
  };
  return response;
};

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
