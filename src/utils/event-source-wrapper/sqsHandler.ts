export default targetHandler => async event => {
  try {
    const { Records } = event;

    // make sure we are processing one at once
    if (Records && Records.length === 1) {
      const { messageId, body } = Records[0];
      const payload = JSON.parse(body);

      await targetHandler({ messageId, payload });
    } else {
      throw new Error('Invalid number of Records provided. Can only process 1 message at a time.');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
