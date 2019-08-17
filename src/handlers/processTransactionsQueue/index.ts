import sqsHandler from '../../utils/event-source-wrapper/sqsHandler';

import hashHelper from '../../common/hash';
import transactions from '../../utils/dynamodb/transactions';

const handler = async ({ payload }) => {
  // updating transaction to consider last4 only
  const card = { ...payload.card };
  const last4 = card.number.slice(-4);
  const transaction = { ...payload, card: { ...card, number: last4 } };

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
