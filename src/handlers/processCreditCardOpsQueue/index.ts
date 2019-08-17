import moment from 'moment';

import sqsHandler from '../../utils/event-source-wrapper/sqsHandler';

import { Transaction } from '../../utils/dynamodb/transactions';
import payables, { PayablesType } from '../../utils/dynamodb/payables';
import hashHelper from '../../common/hash';

interface Params {
  payload: Transaction;
  hash: string
}

const DAYS = 30;
const FEE = 0.05;

const handler = async ({ payload: transaction }: Params) => {
  const {
    card: { number: cardNumber },
    amount: transactionAmount,
  } = transaction;

  const tnxHash = hashHelper.getTransactionHash(transaction);
  const paymentDate = moment()
    .add(DAYS, 'days')
    .toISOString();
  const status = PayablesType.WAITING_FUNDS;
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

export const processCreditCardOpsQueueHandler = sqsHandler(handler);
