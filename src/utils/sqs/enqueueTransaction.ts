import AWS from 'aws-sdk';
import config from '../../config';
import { Transaction } from '../dynamodb/transactions';

interface EnqueueTransactionParams {
  transaction: Transaction;
}

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

export default async ({ transaction }: EnqueueTransactionParams) => {
  const {
    aws: {
      sqs: { transactionsQueue },
    },
  } = config;

  const params = {
    QueueUrl: transactionsQueue,
    MessageBody: JSON.stringify(transaction),
  };
  return sqs.sendMessage(params).promise();
};
