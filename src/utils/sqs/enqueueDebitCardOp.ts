import AWS from 'aws-sdk';
import config from '../../config';
import { Transaction } from '../dynamodb/transactions';

interface Params {
  transaction: Transaction;
}

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

export default async ({ transaction }: Params) => {
  const {
    aws: {
      sqs: { debitCardOpsQueue },
    },
  } = config;

  const params = {
    QueueUrl: debitCardOpsQueue,
    MessageBody: JSON.stringify(transaction),
  };
  console.log('Enqueuing debit card op', transaction);
  return sqs.sendMessage(params).promise();
};
