export default targetHandler => async event => {
  try {
    const { Records } = event;

    // make sure we are processing one at once
    if (Records && Records.length === 1) {
      const {
        eventName,
        dynamodb,
      } = Records[0];

      // we want INSERT ops only
      if (eventName !== 'INSERT') {
        return true;
      }

      const {
        NewImage: {
          transaction: { S: payload },
        },
      } = dynamodb;

      return targetHandler({ payload: JSON.parse(payload) });
    }
    throw new Error('Invalid number of Records provided. Can only process 1 message at a time.');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
