exports.handler = async (event) => {
  console.log("Event: ", event);

  const loyalty_number = generateLoyaltyNumber(6);
  console.log("Got loyalty number: ", loyalty_number);

  const response = {
    loyaltyNumber: loyalty_number,
  };
  console.log("Response: ", response);
  return response;
};

function generateLoyaltyNumber(length) {
    // the length coming in is how many digits you want the number to be
    var crypto = require("crypto");
    return crypto.randomBytes(length / 2).toString("hex").toUpperCase();
}
