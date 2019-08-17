import moment from 'moment';

import sqsHandler from '../../utils/event-source-wrapper/sqsHandler';

import { Transaction } from '../../utils/dynamodb/transactions';
import payables, { PayablesType } from '../../utils/dynamodb/payables';
import hashHelper from '../../common/hash';

interface Params {
  payload: Transaction;
  hash: string;
}

const FEE = 0.03;

const handler = async ({ payload: transaction }: Params) => {
  const {
    card: { number: cardNumber },
    amount: transactionAmount,
  } = transaction;

  const tnxHash = hashHelper.getTransactionHash(transaction);
  const paymentDate = moment().toISOString();
  const status = PayablesType.PAID;
  const amount = transactionAmount - transactionAmount * FEE;

  const payable = {
    cardNumber,
    tnxHash,
    status,
    amount,
    paymentDate,
    transactionAmount,
  };

  await payables.add({ payable });
};

export const processDebitCardOpsQueueHandler = sqsHandler(handler);
