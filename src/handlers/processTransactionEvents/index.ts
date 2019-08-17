import dynamoStreamHandler from '../../utils/event-source-wrapper/dynamoStreamHandler';

import { Transaction, TransactionType } from '../../utils/dynamodb/transactions';

import enqueueCreditCardOp from '../../utils/sqs/enqueueCreditCardOp';
import enqueueDebitCardOp from '../../utils/sqs/enqueueDebitCardOp';

interface Handler {
  payload: Transaction;
}

const handler = async ({ payload: transaction }: Handler) => {
  switch (transaction.type) {
    case TransactionType.CREDIT:
      await enqueueCreditCardOp({ transaction });
      break;
    case TransactionType.DEBIT:
      await enqueueDebitCardOp({ transaction });
      break;
    default:
      console.log('Transaction type not supported', transaction);
      break;
  }
};

export const processTransactionEventsHandler = dynamoStreamHandler(handler);
