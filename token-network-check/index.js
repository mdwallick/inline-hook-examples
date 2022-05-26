const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });

exports.handler = async(event) => {
  console.log("RAW event");
  console.log(event);

  try {
    let req = event.data.context.request;
    let ip_addr = req.ipAddress;
    let response = {};
    let allowed_ip = "";

    // check the DB for an allowed IP address
    console.log("Checking IP address " + ip_addr);

    let record = await getRecord(ip_addr);
    if (Object.keys(record).length > 0) {
      allowed_ip = record.Item.ip_addr;
      console.log("Got IP address", allowed_ip);
    }

    if (ip_addr !== allowed_ip) {
      response = {
        "error": {
          "errorSummary": "You can't request a token from " + ip_addr
        }
      };
    } else {
      response = {
        "commands": [{
          "type": "com.okta.access.patch",
          "value": [{
            "op": "add",
            "path": "/claims/allowed_network",
            "value": "true"
          }]
        }]
      };
    }
    return response;
  } catch (error) {
    console.log("Error", error);
  }
};

async function getRecord(ip_addr) {
  console.log("getRecord()");
  const params = {
    Key: {
      "ip_addr": ip_addr
    },
    TableName: process.env.TABLE_NAME
  };
  return await docClient.get(params).promise();
}
