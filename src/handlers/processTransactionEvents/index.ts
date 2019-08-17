import transactionStreamHandler from '../../utils/event-source-wrapper/transactionStreamHandler';

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

export const processTransactionEventsHandler = transactionStreamHandler(handler);
