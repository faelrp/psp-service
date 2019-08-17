export default targetHandler => async event => {
  try {
    const { Records } = event;

    // make sure we are processing one at once
    if (Records && Records.length === 1) {
      const {
        dynamodb: {
          NewImage: {
            transaction: { S: payload },
          },
        },
      } = Records[0];

      await targetHandler({ payload: JSON.parse(payload) });
    } else {
      throw new Error('Invalid number of Records provided. Can only process 1 message at a time.');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
