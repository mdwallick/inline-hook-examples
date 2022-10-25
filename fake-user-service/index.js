exports.handler = async (event) => {
  console.log("Event: ", event);

  const user_id = event.params.path.id;
  const account_number = between(100000, 999999);
  console.log("Got user ID: ", user_id);
  console.log("Got account number: ", account_number);

  if (user_id === undefined) {
    const message = "No user ID found";
    const response = {
      statusCode: 404,
      message: message,
    };
    return response;
  }

  const response = {
    id: user_id,
    accountNumber: account_number,
  };
  console.log("Response: ", response);
  return response;
};

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
