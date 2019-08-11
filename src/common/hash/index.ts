import crypto from 'crypto';

const getTransactionHash = transaction => {
  const data = JSON.stringify(transaction);

  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
};

export default {
  getTransactionHash,
};
