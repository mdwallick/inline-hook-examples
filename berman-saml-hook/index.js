const AWS = require("aws-sdk");
const okta = require("@okta/okta-sdk-nodejs");
const client = new okta.Client({
  orgUrl: process.env.OKTA_TENANT,
  token: process.env.OKTA_API_KEY,
});

exports.handler = async (event) => {
  console.log(event);

  // get the username and authType from the assertion
  let userName = event.data.context.user.profile["login"];
  let authType = event.data.assertion.claims.AuthType.attributeValues[0].value;

  console.log("Got username: ", userName);
  console.log("Got AuthType: ", authType);

  try {
    let user = await getUser(userName);
    let userId = user.id;

    // if the user doesn't exist, create it real quick, including the authType attribute
    // else, update the authType attribute from the SAML assertion
    user.profile["AuthType"] = authType;
    console.log("Okta user: ", user);

    console.log("Updating user: ", userName);
    await updateUser(userId, user);
    const response = buildResponse();
    return response;
  } catch (error) {
    const response = {
      statusCode: 200,
      error: error,
    };
    return response;
  }
};

async function getUser(userName) {
  return await client.getUser(userName);
}

async function updateUser(userId, user) {
  await client.updateUser(userId, user);
}

function buildResponse() {
  let response = {
    commands: [
      {
        type: "com.okta.assertion.patch",
        value: [
          {
            op: "add",
            path: "/claims/authTypeUpdated",
            value: {
              attributes: {
                NameFormat: "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
              },
              attributeValues: [
                {
                  attributes: {
                    "xsi:type": "xs:string",
                  },
                  value: "true",
                },
              ],
            },
          },
        ],
      },
    ],
  };
  return response;
}
