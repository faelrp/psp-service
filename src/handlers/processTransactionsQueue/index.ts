import sqsHandler from '../../utils/event-source-wrapper/sqsHandler';

import hashHelper from '../../common/hash';
import transactions from '../../utils/dynamodb/transactions';

const handler = async ({ payload: transaction }) => {
  // getting transaction hash
  const hash = hashHelper.getTransactionHash(transaction);

  try {
    await transactions.add({ hash, transaction });
  } catch (error) {
    // conditional check failed here is expected since we can have collisions here.
    // i.g.: same transactions being sent twice.
    if (error.code !== 'ConditionalCheckFailedException') {
      throw error;
    }
  }

  return { success: true };
};

export const processTransactionsQueueHandler = sqsHandler(handler);
