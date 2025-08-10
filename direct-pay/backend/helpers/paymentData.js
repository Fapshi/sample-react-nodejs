// helpers/paymentData.js

function prepareDirectPayData(body) {
  const {
    amount,
    phone,
    name,
    email,
    medium = 'mobile money',
    userId = 'guest_user',
    externalId = `txn_${Date.now()}`,
    message = 'Payment from Ghost',
  } = body;

  return {
    amount,
    phone,
    name,
    email,
    medium,
    userId,
    externalId,
    message,
  };
}

module.exports = { prepareDirectPayData };
